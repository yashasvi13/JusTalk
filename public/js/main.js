const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");

//get username & room from url query string
const params = new URLSearchParams(window.location.search);
const room = params.get("room");
const username = params.get("username");

const socket = io();

//join room
socket.emit("joinRoom", { username, room });
//msg from server
socket.on("message", message => {
  console.log(message);
  outputMessage(message);

  //scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//message send
chatForm.addEventListener("submit", e => {
  e.preventDefault();
  //get msg text
  const msg = e.target.elements.msg.value;
  socket.emit("chatMessage", msg);
  //clear input
  e.target.elements.msg.value = "";
});

//o/p msg to DOM
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
            <p class="text">
              ${message.text}
            </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}
