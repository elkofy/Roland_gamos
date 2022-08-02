const app = require("express")();
const httpServer = require("http").createServer(app);

const options = {
  cors: {
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
  gameState: {
    parameters: {
      manche: 1,
      duree: '30s',
      vie: 1
    },
    turn: 0,
    currentPlayer: '',
    currentArtist: '',
    artists: [],
    ended: false,
    winner: '',
  }
}

const checkingfeaturing = async (answer) => {
  var artists = answer.split(' ');
  if (artists[0] === artists[1]) {
    return 'no featuring';
  }
  return await fetch(`https://api.musixmatch.com/ws/1.1/track.search?q_artist=${answer}&page_size=3&apikey=ab3294bd66018acf67906c2281419b12`)
    .then(res => res.json())
    .then(data => {
      if (data.message.body.track_list.length == 0) {
        return 'no featuring';
      }
      else {
        var featuring = data.message.body.track_list[0].track.track_name;
        console.log(featuring)
        return featuring;
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


io.on("connection", socket => {
  console.log("a user connected", socket.id);
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
  socket.on("players", (room) => {
    socket.join(room);

    io.to(room).emit("players", users.getUserList(room));
    game.players = users.getUserList(room);
    socket.emit("currentplayer", users.getUserList(room)[0]);
  });

  socket.on("answer", async (data) => {
    let room = data[2];
    let currplayer = data[1];
    let idxplayer = game.players.indexOf(currplayer);

    game.gameState.currentPlayer = data[1];
    game.gameState.turn += 1;
    io.to(room).emit("players", users.getUserList(room));
    let checking = await checkingfeaturing(`${data[0]} ${data[3]}`);
    if (checking === 'no featuring') {
      game.gameState.ended = true;
      idxplayer == game.players.length - 1 ? idxplayer = 0 : idxplayer += 1;

      game.gameState.winner = game.players[idxplayer];
      socket.emit("end", game.gameState.ended);
    }
    else {
      game.gameState.currentArtist = data[0];
      // check if the artist is in the list
      if (game.gameState.artists.includes(data[0])) {
        game.gameState.ended = true;
        idxplayer == game.players.length - 1 ? idxplayer = 0 : idxplayer += 1;
        game.gameState.winner = game.players[idxplayer];
        socket.emit("end", game.gameState.ended);
      }
      game.gameState.artists.push(data[0]);
      idxplayer == game.players.length - 1 ? idxplayer = 0 : idxplayer += 1;
      game.gameState.currentPlayer = game.players[idxplayer];

      io.to(room).emit("currentArtist", game.gameState.currentArtist);
    }
    console.log(game.gameState);
    io.to(room).emit("updateGS", game.gameState);
    // socket.emit("checking", checking);
    // socket.emit("currentplayer", false);
  });
  socket.on("getRandArtist", (room) => {
    console.log("getRandArtist", room);
    let artists = ['dinos', 'orelsan', 'alpha wann', 'kaaris', 'freeze corleone', 'laylow', 'damso', 'nekfeu', 'disiz', 'hamza', 'sch', 'la feve', 'zamdane', 'jul', 'alonzo'];
    const randomIndex = Math.floor(Math.random() * artists.length);
    console.log(artists[randomIndex]);
    game.gameState.currentArtist = artists[randomIndex];
    game.gameState.artists.push(artists[randomIndex]);
    game.gameState.turn += 1;
    game.gameState.currentPlayer = users.getUserList(room)[0];
    console.log(game.gameState.currentPlayer);
    io.to(room).emit("getRandArtist", artists[randomIndex]);
    io.to(room).emit("currentplayer", game.gameState.currentPlayer);

  });
  socket.on("gameParams", (data) => {
    console.log("gameParams", data);
    game.gameState.parameters = data[1];
    console.log(game.gameState.parameters);
    io.to(data[1]).emit("gameParams", data);

  })

  socket.on("updateGS", (data) => {
    console.log("updateGS", data[0]);
    game.gameState = data[0];
    io.to(data[1]).emit("updateGS", data[0]);
  }
  );

});

httpServer.listen(4000);
