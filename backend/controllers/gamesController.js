import firebase from "../firebase.js";
import fetch from "node-fetch";
import config from "../config.js";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore";

const db = getFirestore(firebase);

const gameTypes = ["MLB", "NFL", "NBA", "NHL"];

const getFreeStats = async (req, res, statsType) => {
  try {
    const { gameType } = req.params;

    if (!gameTypes.includes(gameType)) {
      return res.status(422).json({ error: "Invalid game parameter" });
    }

    const collection = collection(db, `${statsType} Collection`);
    const querySnapshot = await getDocs(
      query(collection, where("Type", "==", gameType))
    );

    if (querySnapshot.empty) {
      return res.status(200).json({ data: [] });
    }

    const stats = querySnapshot.docs[0].data();
    stats["id"] = querySnapshot.docs[0].id;

    res.status(200).json({ data: [stats] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPremiumStats = async (req, res, statsType) => {
  try {
    const { userId } = req.query;
    const { gameType } = req.params;

    if (!gameTypes.includes(gameType)) {
      return res.status(422).json({ error: "Invalid game parameter" });
    }

    if (!userId) {
      return res.status(422).json({ error: "User Id not provided" });
    }

    const response = await fetch(
      `${config.hostUrl}/api/subscription/check-subscription/${userId}`
    );

    if (response.status !== 200) {
      return res.status(401).json({ error: "Inactive Subscription" });
    }

    const collection = collection(db, `${statsType} Collection`);
    const querySnapshot = await getDocs(
      query(collection, where("Type", "==", gameType))
    );

    if (querySnapshot.empty) {
      return res.status(200).json({ data: [] });
    }

    const stats = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    res.status(200).json({ data: stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getGamesStatsFree = async (req, res) => {
  getFreeStats(req, res, "Game");
};

export const getGamesStatsPremium = async (req, res) => {
  getPremiumStats(req, res, "Game");
};

export const getPlayersStatsFree = async (req, res) => {
  getFreeStats(req, res, "Player");
};

export const getPlayersStatsPremium = async (req, res) => {
  getPremiumStats(req, res, "Player");
};
