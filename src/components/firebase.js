import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
var firebaseConfig = {
    apiKey: "AIzaSyA7nWwyjX2O5bHz0hNLvlmQp1Xb8LgDGbQ",
    authDomain: "admin-teachers-and-students.firebaseapp.com",
    projectId: "admin-teachers-and-students",
    storageBucket: "admin-teachers-and-students.appspot.com",
    messagingSenderId: "201109931923",
    appId: "1:201109931923:web:af99e91a68741f69bb0a66"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db=firebase.firestore();
  const auth=firebase.auth();
  export {db,auth};