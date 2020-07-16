import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSYQ7k89eZPfgiNo0D_sBzpDOxZryHL9w",
  authDomain: "fir-7e260.firebaseapp.com",
  databaseURL: "https://fir-7e260.firebaseio.com",
  projectId: "fir-7e260",
  storageBucket: "fir-7e260.appspot.com",
  messagingSenderId: "785588699048",
  appId: "1:785588699048:web:3635832d33dbe7c8e4a79d"
};

firebase.initializeApp(firebaseConfig);

export const DB = firebase.firestore();
export const auth = firebase.auth();
export const persistentUserData = firebase.auth.Auth.Persistence.SESSION;