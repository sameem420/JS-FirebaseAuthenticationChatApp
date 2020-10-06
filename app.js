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
  let userkey = firebase.database().ref('UsersInfo').push().key;
  let messagekey = firebase.database().ref('chat').push().key;

  const usersRef = dbRef.child('UsersInfo/' + userkey);
  const chatRef = dbRef.child('userChats');

  let message = userMessage.value;
  let messageContent = document.createElement('div');
  messageContent.setAttribute('id', 'messageContent');
  let userName = document.createElement('h5');
  userName.setAttribute('id', 'userName');
  let name = localStorage.getItem('displayName');

  function storeUserData() {
      // Storing dummy data in Firebase
      usersRef.set({
        userID: userkey,
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
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
         window.location = "chat.html"
         var user = result.user;
         localStorage.setItem("email", user.email);
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
        localStorage.clear();
    })
    .catch(()=>{
        console.log("error")
    })
  }

  var userMessage = document.getElementById("message");
  var messages = document.getElementById("messages");

  function sendMessage() {
    // storing messages in DB
    let messageData = {
      userID : messagekey,
      userName : name,
      userEmail : userInfo.email,
      userMessage : message,
    }
    chatRef.push(messageData);
    // retrieving messages from DB
    chatRef.on('value', snapshot => {
      snapshot.forEach(snap => {
        var usermsgInfo = snap.val();
        console.log(usermsgInfo.userID);
        console.log(usermsgInfo.userEmail);
        userName.innerHTML = "~" + usermsgInfo.userName;
        messageContent.innerHTML = usermsgInfo.userMessage;
        messageContent.appendChild(userName);
        messages.appendChild(messageContent);
      });
    });
    storeUserData();
  }