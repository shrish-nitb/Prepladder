import { initializeApp } from "firebase/app";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  // apiKey: "AIzaSyBF-1miFZBB0WEQia-uKDHJSrgwjFYUjj0",
  // authDomain: "auth-4f2c6.firebaseapp.com",
  // projectId: "auth-4f2c6",
  // storageBucket: "auth-4f2c6.appspot.com",
  // messagingSenderId: "498325522723",
  // appId: "1:498325522723:web:41790012a882f48f9a2496",
  // measurementId: "G-TCDYXH479G"
//   apiKey: "AIzaSyBPef9I7Hh3I8rW-9FQkBLdFnb47-Cs2qc",
//   authDomain: "upcube-io.firebaseapp.com",
//   projectId: "upcube-io",
//   storageBucket: "upcube-io.appspot.com",
//   messagingSenderId: "732459975352",
//   appId: "1:732459975352:web:393a450b3d76f022bc6a4d",
//   measurementId: "G-80Z41ZN9Y8",

apiKey: "AIzaSyB-S3EQg0O7_AONI9MWsVS8r90x5Ox2UkI",
authDomain: "prjasc-4ccde.firebaseapp.com",
projectId: "prjasc-4ccde",
storageBucket: "prjasc-4ccde.appspot.com",
messagingSenderId: "708105850428",
appId: "1:708105850428:web:9ad5d97342a9967a793d39",
measurementId: "G-4PP2RGQ23G"

};

const app = initializeApp(firebaseConfig);
// Initialize Firebase

export const initFirebase = () => {
  return app;
};
