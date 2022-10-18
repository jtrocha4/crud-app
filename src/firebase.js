// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYub148GAha4N_L0lEGLG9nRZg4890B8E",
  authDomain: "crud-app-fcadf.firebaseapp.com",
  projectId: "crud-app-fcadf",
  storageBucket: "crud-app-fcadf.appspot.com",
  messagingSenderId: "1061219166245",
  appId: "1:1061219166245:web:dd238f356748f6be5777cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export {db}