import express from 'express';

import {
  subscribe,
  handlePaymentWebhook,
  checkSubscriptionStatus,
  cancelSubscription,
  getSubscriptionData
} from '../controllers/subscriptionController.js';

const router = express.Router();

router.get('/subscribe/:subscriptionType', subscribe);
router.post('/paypal/webhooks/handle-payment', handlePaymentWebhook);
router.get('/data/:userId', getSubscriptionData);
router.get('/check-subscription/:userId', checkSubscriptionStatus);
router.get('/unsubscribe/:userId', cancelSubscription);
export default router;