// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCkIxHNAMhTSYNGr0n97Nd8bb5ciazZvCc",
    authDomain: "js-fbauthentication.firebaseapp.com",
    databaseURL: "https://js-fbauthentication.firebaseio.com",
    projectId: "js-fbauthentication",
    storageBucket: "js-fbauthentication.appspot.com",
    messagingSenderId: "754142624518",
    appId: "1:754142624518:web:8059b4055b3c39cd2f7c87",
    measurementId: "G-NZ7RKVPDXB"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


 let fbLogin = document.getElementById("facebooklogin");

  const signInWithFB = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
         window.location="chat.html"
        // ...
      }).catch(error => {
            console.log(error.message)
        // ...
      });
  }

  fbLogin.addEventListener('click', signInWithFB);