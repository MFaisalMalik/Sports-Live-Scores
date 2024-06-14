import express from 'express';

import {
  subscribe,
  handlePayment
} from '../controllers/subscriptionController.js';

const router = express.Router();

router.get('/subscribe/:subscriptionType', subscribe);
router.post('/paypal/webhooks/handle-payment', handlePayment);

export default router;