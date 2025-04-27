// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb02BIfSSyFPDSbh7O5hyw9t84WZgVWxw",
  authDomain: "eyecare-pi-5.firebaseapp.com",
  projectId: "eyecare-pi-5",
  storageBucket: "eyecare-pi-5.firebasestorage.app",
  messagingSenderId: "616110793750",
  appId: "1:616110793750:web:e2225c89651ec2ff570137",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
