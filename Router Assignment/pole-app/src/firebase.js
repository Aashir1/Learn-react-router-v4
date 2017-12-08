import firebase from 'firebase';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBDcd9bU0RwzA1pif-ClODlbiDfRQKYXAI",
    authDomain: "database-practice-953f0.firebaseapp.com",
    databaseURL: "https://database-practice-953f0.firebaseio.com",
    projectId: "database-practice-953f0",
    storageBucket: "database-practice-953f0.appspot.com",
    messagingSenderId: "207844265210"
  };
  let fire = firebase.initializeApp(config);

export default fire;
