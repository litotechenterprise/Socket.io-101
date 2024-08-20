const express = require("express");
const socket = require("socket.io");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/chat.html");
});

const expressServer = app.listen(8001);

const io = socket(expressServer);

io.on("connection", (socket) => {
  console.log(socket.id, " has connected");

  socket.emit("messageFromServer", { data: "welcome to from the server" });

  socket.on("newMessageFromClient", (dataFromClient) => {
    console.log("Data", dataFromClient);
    io.emit("newMessageToClient", { text: dataFromClient.text });
  });
});
