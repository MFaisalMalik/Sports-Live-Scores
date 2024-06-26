import fetch from "node-fetch";
import config from "../config.js";
import firebase from "../firebase.js";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  getDocs,
  doc,
  Timestamp,
  where,
  query,
} from "firebase/firestore";

const db = getFirestore(firebase);

const auth = Buffer.from(
  `${config.paypaClientId}:${config.paypalSecretKey}`
).toString("base64");

const subscriptionPlanId = {
  monthly: config.paypalMonthlyPlanId,
  annual: config.paypalAnnualPlanId,
};

const setSubscriptionPayload = (
  subscriptionPlanId,
  subscriptionType,
  query
) => {
  const { uid, return_url, cancel_url } = query;

  let subscriptionPayload = {
    plan_id: subscriptionPlanId,
    custom_id: `${uid},${subscriptionType}`,
    application_context: {
      brand_name: `Premium ${subscriptionType} Package`,
      locale: "en-US",
      user_action: "SUBSCRIBE_NOW",
      payment_method: {
        payer_selected: "PAYPAL",
        payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
      },
      return_url: return_url,
      cancel_url: cancel_url,
    },
  };

  return subscriptionPayload;
};

export const subscribe = async (req, res) => {
  const { subscriptionType } = req.params;

  if (!subscriptionType) {
    return res.status(400).send("Missing subscription type information");
  }

  const planId = subscriptionPlanId[subscriptionType];
  if (!planId) {
    return res.status(500).send("Invalid subscription type");
  }

  try {
    const response = await fetch(
      `${config.paypalApiUrl}/v1/billing/subscriptions`,
      {
        method: "post",
        body: JSON.stringify(
          setSubscriptionPayload(planId, subscriptionType, req.query)
        ),
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error creating subscription: ${await response.text()}`);
    }

    const session = await response.json();
    const approveLink = session.links.find(
      (link) => link.rel === "approve"
    ).href;

    res.send({ approveLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const handlePaymentWebhook = async (req, res) => {
  const isValid = await verifyWebhook(req);

  if (!isValid) {
    console.error("Invalid webhook signature");
    res.status(400).send("Invalid webhook signature");
  }

  try {
    const data = req.body;
    if (data.event_type !== "PAYMENT.SALE.COMPLETED") {
      console.log("Ignoring webhook with event type:", data.event_type);
      return res.sendStatus(200);
    }

    activateSubscription(data);
    return res.sendStatus(200);
  } catch (error) {
    console.error("Error processing PayPal webhook:", error);
    res.status(500).send("Internal Server Error");
  }
};

const verifyWebhook = async (req) => {
  const webhookEvent = req.body;

  try {
    const response = await fetch(
      `${config.paypalApiUrl}/v1/notifications/verify-webhook-signature`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({
          auth_algo: req.headers["paypal-auth-algo"],
          cert_url: req.headers["paypal-cert-url"],
          transmission_id: req.headers["paypal-transmission-id"],
          transmission_sig: req.headers["paypal-transmission-sig"],
          transmission_time: req.headers["paypal-transmission-time"],
          webhook_id: config.paypalWebHookId,
          webhook_event: webhookEvent,
        }),
      }
    );

    const data = await response.json();
    return data.verification_status === "SUCCESS";
  } catch (error) {
    console.error("Error verifying PayPal webhook:", error.message);
    return false;
  }
};

const activateSubscription = async (data) => {
  const payload = createSubscriptionPayload(data);

  const subscriptionsCollection = collection(db, "subscriptions");
  const querySnapshot = await getDocs(
    query(subscriptionsCollection, where("userId", "==", payload.userId))
  );

  if (querySnapshot.empty) {
    await addDoc(subscriptionsCollection, payload);
    console.log("Subscription activated successfully");
  } else {
    const docId = querySnapshot.docs[0].id;
    const subscriptionDoc = doc(db, "subscriptions", docId);
    await updateDoc(subscriptionDoc, payload);
    console.log("Updated subscription for userId: ", payload.userId);
  }
};

const createSubscriptionPayload = (data) => {
  const [userId, subscriptionType] = data.resource.custom.split(",");
  let subscriptionStartDate = new Date(data.resource.create_time);
  let subscriptionEndDate = new Date(subscriptionStartDate);

  if (subscriptionType === "monthly") {
    subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);
  } else if (subscriptionType === "annual") {
    subscriptionEndDate.setFullYear(subscriptionEndDate.getFullYear() + 1);
  }

  const payload = {
    subscriptionId: data.resource.billing_agreement_id,
    subscriptionType,
    userId,
    amount: data.resource.amount.total,
    currency: data.resource.amount.currency,
    subscriptionStartDate: Timestamp.fromDate(subscriptionStartDate),
    subscriptionEndDate: Timestamp.fromDate(subscriptionEndDate),
  };

  return payload;
};
