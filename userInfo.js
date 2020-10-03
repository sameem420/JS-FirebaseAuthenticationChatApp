var userInfo = JSON.parse(localStorage.getItem("userInfo"));
var crntUser = document.getElementById("currentUser");
var userPhoto = document.getElementById("user_photo");
var onlineUser = document.getElementById("online_user");
var onlineUserPhoto = document.getElementById("online_userphoto");


onlineUser.innerHTML = userInfo.displayName;
onlineUserPhoto.src = userInfo.photoURL;

crntUser.innerHTML = userInfo.displayName;
userPhoto.src = userInfo.photoURL;

console.log(userInfo);