// firebase.js
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB-S3EQg0O7_AONI9MWsVS8r90x5Ox2UkI",
    authDomain: "prjasc-4ccde.firebaseapp.com",
    projectId: "prjasc-4ccde",
    storageBucket: "prjasc-4ccde.appspot.com",
    messagingSenderId: "708105850428",
    appId: "1:708105850428:web:9ad5d97342a9967a793d39",
    measurementId: "G-4PP2RGQ23G"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const app = firebaseApp.auth();
