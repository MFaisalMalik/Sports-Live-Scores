import firebase from '../firebase.js';
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

const db = getFirestore(firebase);

export const createUser = async (req, res) => {

  const { email } = req.body;

  try {
    const emailUnique = await isEmailUnique(email);
    if (!emailUnique) {
      return res.status(400).send('Email already exists');
    }

    const usersRef = doc(db, 'users', email);
    await setDoc(usersRef, req.body);
    res.status(200).send('User created successfully');

  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function isEmailUnique(email) {
  const usersCollection = collection(db, 'users');
  const querySnapshot = await getDocs(query(usersCollection, where('email', '==', email)));
  return querySnapshot.empty;
}