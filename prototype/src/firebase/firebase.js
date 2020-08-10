import * as firebase from "firebase";

import { FirebaseConfig } from "./keys";
firebase.initializeApp(FirebaseConfig);

// set up firestore
const DB = firebase.firestore();
//export const karelDB = DB.child("karelDB");

// set up real-time database:
//const databaseRef = firebase.database().ref();
//export const karelDB = databaseRef.child("karelDB");


export const createDataLog = (dataLog) => { // dataLog is a dictionary
    return DB.collection('karelDB')
        .add(dataLog);
      }