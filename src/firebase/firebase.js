// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIS3bLVN5noTDczy5tpGk1_yh0DWy7N4g",
  authDomain: "the-samosian-4b94d.firebaseapp.com",
  projectId: "the-samosian-4b94d",
  storageBucket: "the-samosian-4b94d.firebasestorage.app",
  messagingSenderId: "1078582570838",
  appId: "1:1078582570838:web:79f90dd13916bc6a82b0f7",
  measurementId: "G-TMDTF37CY3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);