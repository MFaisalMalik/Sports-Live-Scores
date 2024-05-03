import firebase from '../firebase.js';
import GameStats from '../models/gamesModel.js';
import {
    getFirestore,
    collection,
    getDocs,
} from 'firebase/firestore';

const db = getFirestore(firebase);


export const getGamesStats = async (req, res, next) => {
  try {
    const gameStats = await getDocs(collection(db, 'Game Collection'));
    const gameStatsArray = [];

    if (gameStats.empty) {
      res.status(400).send('No Stats found');
    } else {
      gameStats.forEach((doc) => {
        const data = doc.data();
        const game = new GameStats(
          data['Bet'],
          data['Current Odds'],
          data['Expected Value'],
          data['Game'],
          data['Market'],
          data['Sharp Odds'],
          data['Win Probability'],
          data['Type'],
        );
        gameStatsArray.push(game);
      });

      res.status(200).send(gameStatsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};