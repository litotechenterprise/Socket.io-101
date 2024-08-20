const express = require("express");
const socket = require("socket.io");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/basics.html");
});

const expressServer = app.listen(8000);

const io = socket(expressServer);

io.on("connection", (socket) => {
  console.log(socket.id, " has connected");

  socket.emit("messageFromServer", {
    data: `Hi, ${socket.id} I'm happy you could join us! From: Server`,
  });

  socket.on("messageFromClient", (data) => console.log(data));
});
