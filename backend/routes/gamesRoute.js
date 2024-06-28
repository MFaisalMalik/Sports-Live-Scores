import express from 'express';

import {
  getGamesStatsFree,
  getGamesStatsPremium
} from '../controllers/gamesController.js';

const router = express.Router();

router.get('/free/:gameType', getGamesStatsFree);
router.get('/premium/:gameType', getGamesStatsPremium);

export default router;