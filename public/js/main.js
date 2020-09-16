const chatForm = document.getElementById("chat-form");
const socket = io();

socket.on("message", message => {
  console.log(message);
});

//message send
chatForm.addEventListener("submit", e => {
  e.preventDefault();
  //get msg text
  const msg = e.target.elements.msg.value;
  socket.emit("chatMessage", msg);
});
