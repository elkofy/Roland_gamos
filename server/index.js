const express = require('express');
const http = require('http');
const socketIo = require("socket.io");
const internal = require('stream');
const { ConversationPage } = require('twilio/lib/rest/conversations/v1/conversation');
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

var users = {
  users: [],
  rooms: [],
  addRoom: function (room) {
    this.rooms.push(room);
  },

  addUser: function (id, name, room) {
    var user = { id, name, room };
    this.users.push(user);
    return user;
  }
  ,
  removeUser: function (id) {
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }
  ,
  getUser: function (id) {
    return this.users.filter((user) => user.id === id)[0];
  }
  ,
  getUserList: function (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
  ,
  getRoomList: function () {
    var rooms = this.users.map((user) => user.room);
    var roomsArray = [...new Set(rooms)];

    return roomsArray;
  }
  ,
  getUserRoom: function (id) {
    var user = this.getUser(id);
    return user.room;
  }
  , getUsers: function () {
    return users.users.map((user) => user.name);
    ;
  }

};


io.on('connection', function (socket) {

  socket.on('create', function ([room, user]) {

    console.log(user);
    socket.join(room);
    socket.to(room).emit('listUsers', users.getUsers());
    console.log(`${socket.id} created ${room}`);
    console.log("Coming from create function", users.getUserList(room));

    //users.push({ user: user, socket: socket.id, room: room });
    users.addUser(socket.id, user, room);
    users.addRoom(room);
    io.to("some room").emit("some event");


  });

  socket.on('join', function ([room, user]) {
    console.log(`${socket.id} joined ${room}`);
    socket.join(room);
    users.addUser(socket.id, user, room);
    console.log("Coming from join function", users.getUserList(room));

    // socket.to(room).emit('listUsers', users.getUsers());
    io.to(room).emit('listUsers', users.getUserList(room));

    // socket.broadcast.to(room).emit('listUsers', users.getUserList(room));
    // io.sockets.in(room).emit('listUsers', users.getUserList(room));


  });

  socket.on('message', function (data) {
    console.log("LOOKS LIKE THERE IS A ", data);
  });


  socket.on('getListUsers', function (room) {
    //send users to socket
    console.log(room)

    // socket.emit('listUsers', users.getUserList(room));
    console.log("GETLISTUSERS", users.getUserList(room));
    // console.log("Coming from getlistUser function", users.getUserList(room));
    // socket.emit('listUsers', users.getUserList(data));
    //send users to all sockets in users room
    // socket.to(data).emit('listUsers', users.getUserList(data));

    // io.in(room).emit('listUsers',  users.getUserList(room));
    // socket.broadcast.to(room).emit('listUsers', users.getUserList(room));
    // io.sockets.in(room).emit('listUsers', users.getUserList(room));
    // socket.in(room).emit('listUsers', users.getUserList(room));
    io.to(room).emit('listUsers', users.getUserList(room));

  })

  setInterval(() => {
    let room = "test";
    io.sockets.to(room).emit('message', users);
  }, 1000);
  //send the users to everyone in the room
  socket.on('users', function (room) {
    console.log(`${socket.id} users ${room}`);
    io.sockets.in(room).emit('users', users);
  }

  );
  // socket.emit('users', users);
  //send the list of users to the client

});
io.on('disconnect', function (socket) {
  console.log(`${socket.id} disconnected`);
  users.removeUser(socket.id);
  // io.sockets.in(room).emit('listUsers', users.getUserList(room));
});

// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//       io.emit('chat message', msg);
//     });
//   });