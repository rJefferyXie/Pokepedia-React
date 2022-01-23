// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCei-fp8QrlOlF9bcCw-zripc8MFK4t6j4",
  authDomain: "pokepedia-db98c.firebaseapp.com",
  projectId: "pokepedia-db98c",
  storageBucket: "pokepedia-db98c.appspot.com",
  messagingSenderId: "145510330325",
  appId: "1:145510330325:web:509ef551421dd9799c175c",
  measurementId: "G-E6H048R4Z4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);