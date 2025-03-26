// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyI4lJaDTSSsZiHaVr3V5-aQvmpuo0cb8",
  authDomain: "opticas-ellena.firebaseapp.com",
  projectId: "opticas-ellena",
  storageBucket: "opticas-ellena.firebasestorage.app",
  messagingSenderId: "877842791041",
  appId: "1:877842791041:web:e3a509387aeff7f99eeb80",
  measurementId: "G-EK57JWG933"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);