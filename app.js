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

  // Initializing database instance's
  const dbRef = firebase.database().ref();
  let userkey = firebase.database().ref('UsersInfo').push().key;
  let messagekey = firebase.database().ref('chat').push().key;
  const usersRef = dbRef.child('UsersInfo');
  const chatRef = dbRef.child('userChats');


  let messageContent = document.createElement('div');
  messageContent.setAttribute('id', 'messageContent');

  let userName = document.createElement('h5');
  userName.setAttribute('id', 'userName');
  let name = localStorage.getItem('displayName');
  var userInfo = {};

  // Facebook LogIn Function
  function fbSignIn() {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
         var user = result.user;
         localStorage.setItem("email", user.email);
         localStorage.setItem("displayName", user.displayName);
         localStorage.setItem("userInfo", JSON.stringify(user));
         userInfo = JSON.parse(localStorage.getItem("userInfo"));
         // Storing data in Firebase
         usersRef.on('value', snapshot => {
          snapshot.forEach(snap => {
            let usrInfo = snap.val();
            console.log("localStorage value " + userInfo.email);
            console.log("DB value " + usrInfo.email);
            if(userInfo.email == usrInfo.email) {
              console.log("Record Found");
            }
            else {
              usersRef.push({
                userID: userkey,
                username: userInfo.displayName,
                email: userInfo.email,
                profile_picture : userInfo.photoURL
            });
            }
          });
        }); 
      window.location = "chat.html"
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
    let message = userMessage.value;
    // storing messages in DB
    let messageData = {
      userID : messagekey,
      userName : name,
      userEmail : userInfo.email,
      userMessage : message,
    }
    chatRef.push(messageData);
  }

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

  // retrieving userinfo from DB
  usersRef.on('value', snapshot => {
    snapshot.forEach(snap => {
      let usersInfo = snap.val();
      console.log(usersInfo.userID);
      console.log(usersInfo.username);
      console.log(usersInfo.email);
      console.log(usersInfo.profile_picture);
    });
  });