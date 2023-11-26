// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt3uoU7OCYFkcQ_92ktMhz5_g5dmAeySU",
  authDomain: "ecommerceapp-80caa.firebaseapp.com",
  projectId: "ecommerceapp-80caa",
  storageBucket: "ecommerceapp-80caa.appspot.com",
  messagingSenderId: "618257878696",
  appId: "1:618257878696:web:671adbfe7428cf082ffc9d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);


export {fireDB, auth};