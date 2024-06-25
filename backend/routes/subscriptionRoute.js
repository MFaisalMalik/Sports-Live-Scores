import express from 'express';

import {
  subscribe,
  handlePaymentWebhook
} from '../controllers/subscriptionController.js';

const router = express.Router();

router.get('/subscribe/:subscriptionType', subscribe);
router.post('/paypal/webhooks/handle-payment', handlePaymentWebhook);

export default router;