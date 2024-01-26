// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJXZERKmk-edp5TPy7T1X0xf4ycAWB4ZM",
  authDomain: "pfa-project-e6986.firebaseapp.com",
  projectId: "pfa-project-e6986",
  storageBucket: "pfa-project-e6986.appspot.com",
  messagingSenderId: "714849934561",
  appId: "1:714849934561:web:2f2efef1404fd7613feba0",
  measurementId: "G-RGNPVLNYRH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);