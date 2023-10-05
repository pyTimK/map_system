// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwL_EEKKy__YqPErN6wa7X-f0R1aMbRcA",
  authDomain: "san-rafael-map.firebaseapp.com",
  projectId: "san-rafael-map",
  storageBucket: "san-rafael-map.appspot.com",
  messagingSenderId: "826576021760",
  appId: "1:826576021760:web:57d8abb5cfce5660adabe5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initializeFirestore(app, { localCache: persistentLocalCache(/*settings*/ {}) });

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
