const socket = io("http://localhost:3000");

let form = document.getElementById("form");
let input = document.getElementById("text");
let container = document.querySelector(".container");
const Name = prompt("Enter your name");
var audio = new Audio("../Iphone 14 - Message Tone.mp3")

socket.emit("new-user-join", Name);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let message = input.value
  userConnectNotification(`you:${message}`, "left")
  socket.emit('send', message)
  input.value = ''

})

const userConnectNotification = (message, position) => {
  let item = document.createElement("div");
  item.innerHTML = message;
  item.classList.add("message");
  item.classList.add(position);
  container.append(item);
  if (position == 'right') {

    audio.play()
  }
};
socket.on("user-joined", (data) => {
  console.log(data);
  userConnectNotification(`${data} has joined`, "right");
});
socket.on("received", (data) => {
  userConnectNotification(`${data.name}:${data.message} `, "right");
});
socket.on("left", (name) => {
  userConnectNotification(`${name}  left the chat `, "right");

});
