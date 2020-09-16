const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const { userJoin, currentUser } = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const bot = "JusTalk bot";
//set static folder
app.use(express.static(path.join(__dirname, "public")));

//run when user connects
io.on("connection", socket => {
  console.log("new ws connection...");
  //join room
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);
    socket.emit("message", formatMessage(bot, "Welcome to JusTalk"));
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(bot, `${user.username} has joined the chat`)
      );
    // io.emit("message", formatMessage("User", msg));
    //listen for chat message
    socket.on("chatMessage", msg => {
      io.emit("message", formatMessage(user.username, msg));
    });
    socket.on("disconnect", () => {
      io.emit(
        "message",
        formatMessage(bot, `${user.username} has left the chat`)
      );
    });
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`server running on ${PORT}`));
