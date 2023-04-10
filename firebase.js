import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCBcyGJo6X1QYKGFSxwzIyYLgMpCyDStuM",
    authDomain: "ash-1-a36e0.firebaseapp.com",
    projectId: "ash-1-a36e0",
    storageBucket: "ash-1-a36e0.appspot.com",
    messagingSenderId: "403343809632",
    appId: "1:403343809632:web:46308e50b59f8f2e16f705"
  };
  
// let app;

// if ( firebase.apps.length === 0){
//   app = firebase.initializeApp(firebaseConfig);
// }else{
//   app = firebase.app(); // or else it will keep on initializing

// }


// const db = app.firestore();
// const auth = firebase.auth();

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = firebase.auth();
// const storage = firebase.storage;


export{ db, auth };


