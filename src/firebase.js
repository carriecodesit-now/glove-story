/*
  firebase.js
  Initializes the Firebase app and connects to the Firestore database.
  Exports the db object used throughout the app to read and write game data.
*/

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8cEJTsTlobq4bFjVfLxoHf1epxTK02ps",
  authDomain: "glove-story.firebaseapp.com",
  projectId: "glove-story",
  storageBucket: "glove-story.firebasestorage.app",
  messagingSenderId: "309260866475",
  appId: "1:309260866475:web:4a6cf2c757465b8e0ab8ee"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);