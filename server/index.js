const express = require('express');
const http = require('http');
const socketIo = require("socket.io");
const StartGame = require("./modules/controller");


const app = express();

const server = http.createServer(app);
const io = new socketIo.Server(server, {
  cors: {
    origin: "*"
  }
});

app.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});

app.get("/xD", (req, res) => {
  StartGame();
})

var users = [];


var bool = false;

io.on('connection', function (socket) {
  socket.on('create', function (room) {
    socket.join(room);
    console.log(`${socket.id} created ${room}`);
    users.push({ id: socket.id, room: room });
  });
  socket.on('join', function (room) {
    socket.join(room);
    console.log(`${socket.id} joined ${room}`);
    users.push({ id: socket.id, room: room });
    socket.emit('message', users);

  });

  //send the list of users to the client
 
});

// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//       io.emit('chat message', msg);
//     });
//   });