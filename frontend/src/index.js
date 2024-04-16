import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from './App';
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';

import { Provider } from 'react-redux';
import rootReducer from './reducer';
import { configureStore } from "@reduxjs/toolkit"
import { initializeApp } from "firebase/app";
const store = configureStore({
  reducer: rootReducer,
})

const firebaseConfig = {
  apiKey: "AIzaSyB-S3EQg0O7_AONI9MWsVS8r90x5Ox2UkI",
  authDomain: "prjasc-4ccde.firebaseapp.com",
  projectId: "prjasc-4ccde",
  storageBucket: "prjasc-4ccde.appspot.com",
  messagingSenderId: "708105850428",
  appId: "1:708105850428:web:9ad5d97342a9967a793d39",
  measurementId: "G-4PP2RGQ23G"
};

initializeApp(firebaseConfig);



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(sendToVercelAnalytics);
