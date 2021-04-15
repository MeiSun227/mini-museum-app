import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBmvsi9xx8FOh1679VZHP5jGyKsPt4gjSk",
  authDomain: "mini-museum.firebaseapp.com",
  projectId: "mini-museum",
  storageBucket: "mini-museum.appspot.com",
  messagingSenderId: "963216350421",
  appId: "1:963216350421:web:9276aa7a5fafd1e38a565c",
};
// Initialize Firebase
const db = firebase.initializeApp(firebaseConfig);

export default db;
