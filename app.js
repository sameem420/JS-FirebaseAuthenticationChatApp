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


  const dbRef = firebase.database().ref();
  var userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const usersRef = dbRef.child('UsersInfo').child(userInfo.uid+'/');
  const msgsRef = dbRef.child('UsersMessages');

  function storeUserData() {
      // Storing dummy data in Firebase
      usersRef.set({
        userID: userInfo.uid,
        username: userInfo.displayName,
        email: userInfo.email,
        profile_picture : userInfo.photoURL
    });
  }
  
   // retreiving data from Firebase
   usersRef.on('value', snapshot => {
    console.log(snapshot.val());
  });

  // Facebook LogIn Function
  function fbSignIn() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
         window.location = "chat.html"
         var user = result.user;
         localStorage.setItem("userEmail", user.email);
         localStorage.setItem("displayName", user.displayName);
         localStorage.setItem("userInfo", JSON.stringify(user));
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
    var key = firebase.database().ref('chat').push().key;
    var Email = localStorage.getItem('userEmail');
    console.log(Email);
    var messagesend = {
      message : messageContent.innerText,
      key : key,
      user : userName.textContent
    }
    firebase.database().ref('chat/' + Email).set(messagesend);
  }