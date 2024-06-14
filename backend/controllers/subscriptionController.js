import fetch from 'node-fetch';
import config from '../config.js';

const subscriptionPlanId = {
    'monthly': config.paypalMonthlyPlanId,
    'annual': config.paypalAnnualPlanId
};

const setSubscriptionPayload = (subscriptionPlanId) => {
    let subscriptionPayload = {
        "plan_id": subscriptionPlanId,
        "application_context": {
            "brand_name": "Premium Monthly Package",
            "locale": "en-US",
            "user_action": "SUBSCRIBE_NOW",
            "payment_method": {
                "payer_selected": "PAYPAL",
                "payee_preferred": "IMMEDIATE_PAYMENT_REQUIRED"
            }
        }
    }

    return subscriptionPayload;
}

export const subscribe = async (req, res) => {

    const { subscriptionType } = req.params;
    if (!subscriptionType) {
        return res.status(400).send('Missing subscription type information');
    }

    const planId = subscriptionPlanId[subscriptionType];
    if (!planId) {
        return res.status(500).send('Invalid subscription type');
    }

    try {
        const token = Buffer.from(config.paypaClientId + ":" + config.paypalSecretKey).toString("base64");
        const response = await fetch('https://api-m.sandbox.paypal.com/v1/billing/subscriptions', {
            method: 'post',
            body: JSON.stringify(setSubscriptionPayload(planId)),
            headers: {
                'Authorization': `Basic ${token}`,
                'Content-Type': 'application/json'
            },

        });

        if (!response.ok) {
            throw new Error(`Error creating subscription: ${await response.text()}`);
        }

        const session = await response.json();
        const approveLink = session.links.find(link => link.rel === 'approve').href;
        res.send({ approveLink });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const handlePayment = async (req, res) => {
    console.log(req);
}