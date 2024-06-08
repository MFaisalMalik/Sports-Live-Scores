import express from 'express';

import {
  subscribe
} from '../controllers/subscriptionController.js';

const router = express.Router();

router.get('/subscribe/:subscriptionType', subscribe);

export default router;