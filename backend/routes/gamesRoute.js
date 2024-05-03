import express from 'express';

import {
  getGamesStats
} from '../controllers/gamesController.js';

const router = express.Router();

router.get('/', getGamesStats);

export default router;