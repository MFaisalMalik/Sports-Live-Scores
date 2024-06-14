import fetch from "node-fetch";
import crypto from "crypto";
import config from "../config.js";

const subscriptionPlanId = {
  monthly: config.paypalMonthlyPlanId,
  annual: config.paypalAnnualPlanId,
};

const setSubscriptionPayload = (subscriptionPlanId) => {
  let subscriptionPayload = {
    plan_id: subscriptionPlanId,
    application_context: {
      brand_name: "Premium Monthly Package",
      locale: "en-US",
      user_action: "SUBSCRIBE_NOW",
      payment_method: {
        payer_selected: "PAYPAL",
        payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
      },
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
    const token = Buffer.from(
      config.paypaClientId + ":" + config.paypalSecretKey
    ).toString("base64");
    const response = await fetch(
      "https://api-m.sandbox.paypal.com/v1/billing/subscriptions",
      {
        method: "post",
        body: JSON.stringify(setSubscriptionPayload(planId)),
        headers: {
          Authorization: `Basic ${token}`,
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

export const handlePayment = async (req, res) => {
  try {
    const authHeader = req.headers["auth-as-paypal-signature"];
    if (!authHeader) {
      return res
        .status(401)
        .send("Unauthorized: Missing authentication header");
    }

    const secret = process.env.PAYPAL_WEBHOOK_SECRET;
    const hashedData = crypto
      .createHmac("sha256", secret)
      .update(req.rawBody)
      .digest("base64");

    if (hashedData !== authHeader) {
      return res.status(403).send("Forbidden: Invalid signature");
    }

    const data = JSON.parse(req.body);

    if (data.event_type !== "PAYMENT.SALE.COMPLETED") {
      console.log(
        "Ignoring webhook with event type:",
        data.event_type,
        data.id
      );
      return res.sendStatus(200);
    }

    const transactionId = data.resource.id;
    const payerId = data.payer.payer_info.payer_id;
    const amount = data.resource.amount.total;
    const currency = data.resource.amount.currency;

    // Update Firebase database (assuming `updateSubscriptionStatus` exists)
    // await updateSubscriptionStatus(transactionId, "active");

    // Trigger success actions in your React frontend (optional)
    // You can emit an event or send a separate message to your frontend for handling success

    return res.sendStatus(200);
  } catch (error) {
    console.error("Error processing PayPal webhook:", error);
    res.status(500).send("Internal Server Error");
  }
};
