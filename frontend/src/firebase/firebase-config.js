
import {getAuth} from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCQUCMUYsH-MMCWHb-aJO1_JbLrRZQG5Wk",
  authDomain: "doctor--s-appointment.firebaseapp.com",
  projectId: "doctor--s-appointment",
  storageBucket: "doctor--s-appointment.firebasestorage.app",
  messagingSenderId: "858718955578",
  appId: "1:858718955578:web:fd1a23e6bf41c129352d03",
  measurementId: "G-MH3GT5HZBK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth(app);