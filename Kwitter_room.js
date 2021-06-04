var firebaseConfig = {
    apiKey: "AIzaSyB0uVN0pP2HcagZ0i2AK7h6UUu-B4-i5is",
    authDomain: "let-s-chat-web-app-9509d.firebaseapp.com",
    databaseURL: "https://let-s-chat-web-app-9509d-default-rtdb.firebaseio.com",
    projectId: "let-s-chat-web-app-9509d",
    storageBucket: "let-s-chat-web-app-9509d.appspot.com",
    messagingSenderId: "613138704064",
    appId: "1:613138704064:web:d798eb99105fe0de1caf25"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_name");
  document.getElementById("user_name").innerHTML = "Welcome " + user_name + " !";
  function addRoom() {
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({ purpose: "adding room name" });
    localStorage.setItem("room_name", room_name);
    window.location = "Kwitter_page.html";
}
function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
          document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key;
                Room_names = childKey;
                //Start code
                console.log("Room Name - " + Room_names);
                row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div><hr>";
                document.getElementById("output").innerHTML += row;
                //End code
          });
    });
}
getData();
function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}