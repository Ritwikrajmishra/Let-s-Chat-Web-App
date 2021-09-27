function logout()
{
    localStorage.removeItem("room_name");
    localStorage.removeItem("user_name");
    window.location="index.html";
}
var firebaseConfig = { apiKey: "AIzaSyCLGpxZs2pD9mqZCrFwuOI0gYPdRWN5Ksw", authDomain: "kwitter-6abca.firebaseapp.com", databaseURL: "https://kwitter-6abca-default-rtdb.firebaseio.com", projectId: "kwitter-6abca", storageBucket: "kwitter-6abca.appspot.com", messagingSenderId: "231606977400", appId: "1:231606977400:web:d2d2878892c4b97584fe8d" }; 

firebase.initializeApp(firebaseConfig);
  user_name = localStorage.getItem("user_name");
    room_name = localStorage.getItem("room_name");
    function send()
{
 msg = document.getElementById("msg").value;
 firebase.database().ref(room_name).push({
       name:user_name,
      message : msg,
      like:0
      });
    document.getElementById("msg").value = "";                                      
}
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
      firebase_message_id = childKey; message_data = childData; console.log(message_data); name = message_data['name']; message = message_data['message']; like = message_data['like']; row = "<h4> "+ name +"<img class='user_tick' src='tick.png'>"+ message +"</h4><button class='btn btn-warning' id='"+firebase_message_id+" value='"+like+"' onclick='updateLike(this.id)'> Like: "+ like +"</span></button><hr>"; document.getElementById("output").innerHTML += row;
      } });  }); }
getData();
function updateLike(message_id)
{
      console.log("clicked on like button - "+ message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({like : updated_likes});
}
