const app = require("express")();
const httpServer = require("http").createServer(app);

const options = { 
  cors : {
    origin: "*",
  }
 };

const io = require("socket.io")(httpServer, options);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
}
);
var game = {
  players: [],
  turn: 0,
  gameState: {
    currentPlayer: 0,
    turn: 0,
  }
}

const checkingfeaturing = async (answer) => {
 return await fetch(`https://api.musixmatch.com/ws/1.1/track.search?q_artist=${answer}&page_size=3&apikey=ab3294bd66018acf67906c2281419b12`)
 .then(res => res.json())
  .then(data => {
     if (data.message.body.track_list.length==0){
      console.log('no featuring')
      return false;
     }
      else{
        console.log('featuring')
        return true;
      }
  }
  )
  .catch(err => console.log(err));

}

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

let asynchronizer = () => {

}

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
    console.log(users);
  }
  );
  socket.on("startGame", (room) => {
    console.log("startGame", room);
    io.to(room).emit("startGame", room);
  }
  );
  socket.on("players" , (room) => {
    socket.join(room);
    io.to(room).emit("players", users.getUserList(room));
    game.players = users.getUserList(room);
  });

  socket.on("answer", async (data) => {
    console.log("answer", data[0]);
    game.gameState.currentPlayer = data[1];
    game.gameState.turn+=1;
    let room = data[2];
    io.to(room).emit("players", users.getUserList(room));
    var checking = await checkingfeaturing(`${data[0]} ${data[3]}`);
    socket.emit( "checking",  checking );

    
  });


});

httpServer.listen(4000);
// WARNING !!! app.listen(3