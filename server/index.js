const express = require('express');
const http = require('http');
const socketIo = require("socket.io");
const internal = require('stream');
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


io.on('connection', function (socket) {

  socket.on('create', function ([room, user]) {
    console.log(user);
    socket.join(room);
    console.log(`${socket.id} created ${room}`);
    users.push({ user: user, socket: socket.id, room: room });
  });

  socket.on('join', function ([room, user]) {
    socket.join(room);
    console.log(user);
    console.log(`${socket.id} joined ${room}`);
    users.push({ user: user, socket: socket.id, room: room });
    // io.sockets.in(room).emit('joiner', users);
    io.sockets.in(room).emit('listUsers', users);
    // io.sockets.in(room).emit('message', "joiner");
    //send to all the sockets 
    //broadcast to all the sockets except the sender
    socket.broadcast.emit('listUsers', users);
    // socket.to(room).emit('listUsers', users);
    // socket.broadcast.to(room).emit('listUsers', users);
    // io.to(room).emit('listUsers', users);
    // io.sockets.in(room).emit('listUsers', users);
  });

  socket.on('message', function (data) {
    console.log(data);

  });

  socket.on('getListUsers', function (data) {
    //send users to socket
    socket.emit('listUsers', users);
    //send users to all sockets in users room
    // socket.broadcast.to(data.room).emit('listUsers', users);

  })

  setInterval(() => {
    let room = "test";
    io.sockets.in(room).emit('users', users);
  }, 1000);
  //send the users to everyone in the room
  socket.on('users', function (room) {
    console.log(`${socket.id} users ${room}`);
    io.sockets.in(room).emit('users', users);
  }

  );

  //send the list of users to the client

});

// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//       io.emit('chat message', msg);
//     });
//   });