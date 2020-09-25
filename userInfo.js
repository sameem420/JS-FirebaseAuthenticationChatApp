var userInfo = JSON.parse(localStorage.getItem("userInfo"));
var crntUser = document.getElementById("currentUser");
var userPhoto = document.getElementById("user_photo");

crntUser.innerHTML = localStorage.getItem("displayName");
userPhoto.src = userInfo.photoURL;

console.log(userInfo);