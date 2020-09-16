const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//run when user connects
io.on("connection", socket => {
  console.log("new ws connection...");
  socket.emit("message", "Welcome to JusTalk");
  socket.broadcast.emit("message", "A user has joined the chat");

  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat");
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`server running on ${PORT}`));
