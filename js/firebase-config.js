// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYI9D-5hOYmQFkWxW0EzrBX5vnnu3BPT8",
  authDomain: "zero-bullying-asmr.firebaseapp.com",
  projectId: "zero-bullying-asmr",
  storageBucket: "zero-bullying-asmr.appspot.com",
  messagingSenderId: "380334470589",
  appId: "1:380334470589:web:e43ce1dc5e5f98adcb0ed4",
  measurementId: "G-SCMX7NLL1H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = firebase.firestore();
export const storage = firebase.storage();
