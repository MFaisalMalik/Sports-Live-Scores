import firebase from '../firebase.js';
import User from '../models/userModel.js';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase);

export const createUser = async (req, res, next) => {
  try {
    await addDoc(collection(db, 'users'), req.body);
    res.status(200).send('user created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};