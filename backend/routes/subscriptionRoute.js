import express from 'express';

import {
  subscribe,
  handlePaymentWebhook,
  checkSubscriptionStatus,
  cancelSubscription,
  getSubscriptionData,
  removeSubscriptionData,
  activateFreeTrial
} from '../controllers/subscriptionController.js';

const router = express.Router();

router.get('/subscribe/:subscriptionType', subscribe);
router.post('/paypal/webhooks/handle-payment', handlePaymentWebhook);
router.get('/data/:userId', getSubscriptionData);
router.get('/check-subscription/:userId', checkSubscriptionStatus);
router.get('/unsubscribe/:userId/:docId', cancelSubscription);
router.get('/remove/:docId', removeSubscriptionData);
router.get('/activate/free-trial/:userId', activateFreeTrial);

export default router;