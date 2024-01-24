// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSDHDF7DtfQA7X9zIXmdwIH4q7UW28fuY",
  authDomain: "senpai-learning-portal-vue.firebaseapp.com",
  projectId: "senpai-learning-portal-vue",
  storageBucket: "senpai-learning-portal-vue.appspot.com",
  messagingSenderId: "187487976293",
  appId: "1:187487976293:web:fd020cf79b6450c6983f8c",
  measurementId: "G-SZKJJBGBN8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };