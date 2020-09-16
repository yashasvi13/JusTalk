const chatMessages = document.querySelector(".chat-messages");
const socket = io();

//msg from server
socket.on("message", message => {
  console.log(message);
  outputMessage(message);
});

//message send
chatForm.addEventListener("submit", e => {
  e.preventDefault();
  //get msg text
  const msg = e.target.elements.msg.value;
  socket.emit("chatMessage", msg);
});

//o/p msg to DOM
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
            <p class="text">
              ${message}
            </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}
