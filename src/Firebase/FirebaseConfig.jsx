// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaUGooefrqKhT952PkW6nw76xDZXjiajM",
  authDomain: "myfirstapp-36686.firebaseapp.com",
  projectId: "myfirstapp-36686",
  storageBucket: "myfirstapp-36686.appspot.com",
  messagingSenderId: "1013074162344",
  appId: "1:1013074162344:web:e4d42a06f077a689cc889d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB,auth } ;