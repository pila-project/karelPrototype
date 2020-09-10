import * as firebase from "firebase";

//import { FirebaseConfig } from "./keys";
//const firebaseApp = firebase.initializeApp(FirebaseConfig);

const FireBaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
};
const firebaseApp = firebase.initializeApp(FireBaseConfig)

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

var firebaseAuth = firebaseApp.auth();
firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

export default firebaseAuth
