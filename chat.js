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


 var fbLogout = document.getElementById("signout");
 var crntUser = document.getElementById("currentUser");

  let fbSignOut = () => {
    firebase.auth().signOut().then((result)=>{
        window.location= 'index.html'
        var user = result.username;
        crntUser.innerHTML = user;
        console.log(crntUser);
    })
    .catch(()=>{
        console.log("error")
    })

}

 fbLogout.addEventListener('click', fbSignOut);