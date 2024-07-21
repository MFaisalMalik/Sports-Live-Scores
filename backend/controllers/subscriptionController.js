import fetch from "node-fetch";
import config from "../config.js";
import firebase from "../firebase.js";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  getDocs,
  deleteDoc,
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


export const checkSubscriptionStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const subscriptionsCollection = collection(db, "subscriptions");
    const querySnapshot = await getDocs(
      query(subscriptionsCollection, where("userId", "==", userId))
    );

    if (querySnapshot.empty) {
      res.status(404).json({ message: "Inactive Subscription" });
      return;
    }

    const subscriptionData = querySnapshot.docs[0].data();
    const currentTimestamp = Date.now();
    const subscriptionEndDateMs = subscriptionData.subscriptionEndDate.seconds * 1000;

    if (subscriptionEndDateMs < currentTimestamp) {
      res.status(404).json({ message: "Inactive Subscription" });
      return;
    }

    res.status(200).json({ message: "Active Subscription" });
  } catch (error) {
    console.error("Error processing PayPal webhook:", error);
    res.status(500).send("Internal Server Error");
  }
};


export const getSubscriptionData = async (req, res) => {
  try {
    const { userId } = req.params;

    const subscriptionsCollection = collection(db, "subscriptions");
    const querySnapshot = await getDocs(
      query(subscriptionsCollection, where("userId", "==", userId))
    );

    if (querySnapshot.empty) {
      res.status(404).json({ message: "Inactive Subscription" });
      return;
    }

    const subscriptionData = querySnapshot.docs[0].data();

    res.status(200).json({ data: subscriptionData });
  } catch (error) {
    console.error("Error processing PayPal webhook:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const removeSubscriptionData = async (userId) => {
  try {

    const subscriptionsCollection = collection(db, "subscriptions");
    await deleteDoc(
      query(subscriptionsCollection, where("userId", "==", userId))
    );

    return { message: 'Subscription successfully deleted' }
  } catch (error) {
    return Error ("Internal Server Error")
  }
};

export const cancelSubscription = async (req, res) => {
  try {
    const { userId } = req.params;
    const subscriptionId = await getSubscriptionId(userId);

    if (!subscriptionId) {
      return res
        .status(404)
        .send(`No subscription found for userId: ${userId}`);
    }

    const response = await fetch(
      `${config.paypalApiUrl}/v1/billing/subscriptions/${subscriptionId}/cancel`,
      {
        method: "post",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ reason: "Not satisfied with the service" }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to cancel subscription: ${response.statusText}`);
    } else {
      try {
        await removeSubscriptionData(userId)
      } catch (error) {
        console.log(error)
      }
    }

    res.status(200).send("Subscription cancelled successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getSubscriptionId = async (userId) => {
  try {
    const subscriptionsCollection = collection(db, "subscriptions");
    const q = query(subscriptionsCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }
    const doc = querySnapshot.docs[0];
    return doc.data().subscriptionId;
  } catch (error) {
    console.error(
      `Error fetching subscription ID for userId ${userId}:`,
      error
    );
    throw error;
  }
};

export const handlePaymentWebhook = async (req, res) => {
  console.log(req.body)
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
    } else {
      await activateSubscription(data).then(()=> {
        return res.sendStatus(200);
      }).catch(()=>{
        return res.sendStatus(500)
      })
    }
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
  try {
    const subscriptionsCollection = collection(db, "subscriptions");
    const querySnapshot = await getDocs(
      query(subscriptionsCollection, where("userId", "==", payload.userId))
    );
    if (querySnapshot.empty) {
      await addDoc(subscriptionsCollection, payload);
      console.log("Subscription activated successfully");
      return;
    } else {
      const docId = querySnapshot.docs[0].id;
      const subscriptionDoc = doc(db, "subscriptions", docId);
      await updateDoc(subscriptionDoc, payload);
      console.log("Updated subscription for userId: ", payload.userId);
      return;
    }
    
  } catch (error) {
    console.log(error)
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
