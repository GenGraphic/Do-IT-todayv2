// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseAPIKey from "./apikey";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: firebaseAPIKey,
  authDomain: "do-it-today-a07a6.firebaseapp.com",
  projectId: "do-it-today-a07a6",
  storageBucket: "do-it-today-a07a6.appspot.com",
  messagingSenderId: "942254889554",
  appId: "1:942254889554:web:bbb2b10bd79a22c5031d8b"
};

// Initialize Firebase
const app =  initializeApp(firebaseConfig);
export const authentication = getAuth(app);

