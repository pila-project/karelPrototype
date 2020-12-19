import * as firebase from "firebase";

//import { FirebaseConfig } from "./keys";
//const firebaseApp = firebase.initializeApp(FirebaseConfig);

const fireBaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
};
const firebaseApp = firebase.initializeApp(fireBaseConfig)

// set up firestore
const DB = firebase.firestore();
//export const karelDB = DB.child("karelDB");

// set up real-time database:
//const databaseRef = firebase.database().ref();
//export const karelDB = databaseRef.child("karelDB");

console.log(fireBaseConfig)


export const createDataLog = (dataLog) => { // dataLog is a dictionary
    return DB.collection('karelDB')
        .add(dataLog);
    }

var auth = firebaseApp.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

export const firebaseAuth = auth

export default firebaseApp
