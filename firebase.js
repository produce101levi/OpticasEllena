// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";

import 'dotenv/config';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics
if (typeof window !== 'undefined'){
  isSupported().then((supported) => {
    if (supported){
      analytics = getAnalytics(app);
      console.log("Firebase Analytics initialized");
    } else {
      console.warn("Firebase Analytics is not supported in this environment");
    }
  })
} 

const auth = getAuth(app);

export { app, analytics, auth };
// console.log("Auth exported:", auth);