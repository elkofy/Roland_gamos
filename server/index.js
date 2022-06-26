const app = require("express")();
const httpServer = require("http").createServer(app);

const options = { 
  cors : {
    origin: "*",
  }
 };

const io = require("socket.io")(httpServer, options);

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
io.on("connection", socket => { 
console.log("a user connected",socket.id);
socket.on("disconnect", () => {
  console.log("user disconnected");
}
);
  socket.on("create", (data) => {
    console.log("create", data[0]);
    socket.join(data[0]);
    users.addRoom(data[0]);
    users.addUser(socket.id, data[1], data[0]);
    io.to(data[0]).emit("room", users.getUserList(data[0]));

  }
  );
  socket.on("join", (data) => {
    console.log("join", data);
    socket.join(data[0]);
    users.addUser(socket.id, data[1], data[0]);
    io.to(data[0]).emit("room", users.getUserList(data[0]));
  }
  );

});

httpServer.listen(4000);
// WARNING !!! app.listen(3