import { initializeApp } from "firebase/app";
import * as auth from "firebase/auth";
import * as firestore from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPfuLykwcDHGjeXuvHhXWzH2r9Gtql-II",
  authDomain: "skincare-9915b.firebaseapp.com",
  projectId: "skincare-9915b",
  storageBucket: "skincare-9915b.appspot.com",
  messagingSenderId: "278714093625",
  appId: "1:278714093625:web:c82b022ed6a61b6960bde8",
};

const app = initializeApp(firebaseConfig);

export { app, auth, firestore };
