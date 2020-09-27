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


  const dbRef = firebase.database().ref('chatUsersData');
  dbRef.set({
    username: "Sameem",
    email: "email@email.com",
    profile_picture : "imageUrl"
  }, function(error) {
    if (error) {
      console.log("The write failed...");
    } else {
      console.log("Data saved successfully!");
    }
  });


  var userMessage = document.getElementById("message");
  var btnSendMessage = document.getElementById("btnSend");
  var messages = document.getElementById("messages");

  let sendMessage = () => {
    let message = userMessage.value;
    let messageContent = document.createElement('li');
    let userName = document.createElement('p');
    userName.setAttribute('id', 'userName');
    userName.innerHTML = localStorage.getItem('displayName');
    messageContent.setAttribute('id', 'messageContent');
    messageContent.innerText = userName.innerText + " : " + message;
    messages.appendChild(messageContent);
  }


  btnSendMessage.addEventListener('click', sendMessage);

 // Facebook LogIn Function
  function signInWithFB() {
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