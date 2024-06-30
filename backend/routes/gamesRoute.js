import express from 'express';

import {
  getGamesStatsFree,
  getGamesStatsPremium,
  getPlayersStatsFree,
  getPlayersStatsPremium
} from '../controllers/gamesController.js';

const router = express.Router();

router.get('/free/:gameType', getGamesStatsFree);
router.get('/premium/:gameType', getGamesStatsPremium);
router.get('/players/free/:gameType', getPlayersStatsFree);
router.get('/players/premium/:gameType', getPlayersStatsPremium);

export default router;