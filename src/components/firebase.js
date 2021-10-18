import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyDvqLhfuIX2C88YySjWykO2rX6w0yUZU1E",
    authDomain: "chat-app-38ca4.firebaseapp.com",
    projectId: "chat-app-38ca4",
    storageBucket: "chat-app-38ca4.appspot.com",
    messagingSenderId: "785972954995",
    appId: "1:785972954995:web:c9b8cb693b4de1cf12a706"
}).auth();