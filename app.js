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


  const dbRef = firebase.database().ref('UsersInfo/');

  function storeUserData() {
      // Storing dummy data in Firebase
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userInfo);
    dbRef.push({
      userID: userInfo.uid,
      username: userInfo.displayName,
      email: userInfo.email,
      profile_picture : userInfo.photoURL
    });
  }
  
   // retreiving data from Firebase
   dbRef.on('value', function(snapshot) {
    console.log(snapshot.val());
  });

  // Facebook LogIn Function
  function fbSignIn() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
         window.location = "chat.html"
         var user = result.user;
         localStorage.setItem("userInfo", JSON.stringify(user));
         localStorage.setItem("displayName", user.displayName);
        // ...
      }).catch(error => {
            console.log(error.message)
      });
  }

  // Facebook LogOut Function
  function fbSignOut() {
    firebase.auth().signOut().then(() => {
        window.location= 'index.html'
    })
    .catch(()=>{
        console.log("error")
    })
  }


  var userMessage = document.getElementById("message");
  var btnSendMessage = document.getElementById("btnSend");
  var messages = document.getElementById("messages");

  function sendMessage() {
    let message = userMessage.value;
    let messageContent = document.createElement('div');
    let userName = document.createElement('h5');
    userName.setAttribute('id', 'userName');
    userName.innerHTML = "~" + localStorage.getItem('displayName');
    messageContent.setAttribute('id', 'messageContent');
    messageContent.innerHTML = message;
    messageContent.appendChild(userName);
    messages.appendChild(messageContent);
    storeUserData();
  }