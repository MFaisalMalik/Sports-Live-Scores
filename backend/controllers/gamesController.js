import firebase from "../firebase.js";
import fetch from "node-fetch";
import config from "../config.js";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  where,
  query,
  limit,
  limitToLast,
  startAfter,
  endBefore,
  endAt,
  orderBy,
  getCountFromServer,
} from "firebase/firestore";

const db = getFirestore(firebase);

const gameTypes = ["MLB", "NFL", "NBA", "NHL"];

const getFreeStats = async (req, res, statsType) => {
  try {
    const { gameType } = req.params;

    if (!gameTypes.includes(gameType)) {
      return res.status(422).json({ error: "Invalid game parameter" });
    }

    const statsCollection = collection(db, `${statsType} Collection`);
    const querySnapshot = await getDocs(
      query(statsCollection, where("Type", "==", gameType))
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
    const { userId, page, per_page, page_action, after_this, before_this } =
      req.query;
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

    const statsCollection = collection(db, `${statsType} Collection`);
    let queryRef;
    if (page > 1) {
      if (page_action === "NEXT") {
        const docSnap = await getDoc(doc(db, `${statsType} Collection`, after_this))
        queryRef = query(
          statsCollection,
          where("Type", "==", gameType),
          limit(per_page ?? 5),
          orderBy("Win Probability"),
          startAfter(docSnap)
        );
      }
      if (page_action === "PREVIOUS") {
        const docSnap = await getDoc(doc(db, `${statsType} Collection`, before_this))
        queryRef = query(
          statsCollection,
          where("Type", "==", gameType),
          limitToLast(per_page ?? 5),
          orderBy("Win Probability"),
          endBefore(docSnap)
        );
      }
    } else {
      queryRef = query(
        statsCollection,
        where("Type", "==", gameType),
        limit(per_page ?? 5),
        orderBy("Win Probability")
      );
    }
    const querySnapshot = await getDocs(queryRef);
    const countSnapshot = await getCountFromServer(
      query(statsCollection, where("Type", "==", gameType))
    );
    const count = countSnapshot.data().count;
    if (querySnapshot.empty) {
      return res
        .status(200)
        .json({
          data: [],
          count,
          afterThis: after_this,
          beforeThis: before_this,
        });
    }

    const stats = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    const afterThis = stats[stats.length - 1].id;
    const beforeThis = stats[0].id;
    res.status(200).json({ data: stats, count, beforeThis, afterThis});
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
