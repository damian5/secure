import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/database';
import { config } from 'config/config';

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const firestore = firebase.firestore;
export const bucket = firebase.database();
export const auth = firebase.auth();
export const  persistentUserData = firebase.auth.Auth.Persistence.LOCAL;

db.enablePersistence()