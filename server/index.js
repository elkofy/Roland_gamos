const app = require("express")();
const httpServer = require("http").createServer(app);

const options = {

};

const io = require("socket.io")(httpServer, options);

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);

  // Pass to next layer of middleware
  next();
});
app.get("/", (req, res) => {

  res.send("<h1>Rollad Gamos Api</h1>");
}
);
let game = {
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
class Room {
  constructor(name, players = []) {
    this.name = name;
    this.players = [];
    this.gameState = {
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
    };
  }
  addPlayer(player) {
    this.players.push(player);
  }
  removePlayer(player) {
    this.players = this.players.filter((player) => player.id !== id);
  }
  setGameState(gameState) {
    this.gameState = gameState;
  }
  getGameState() {
    return this.gameState;
  }
  getPlayers() {
    return this.players;
  }
  getRoomName() {
    return this.name;
  }

}
class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  getName() {
    return this.name;
  }
  getRoom() {
    return this.room;
  }

}



var storage = {
  rooms: [],
  addRoom: function (room) {
    this.rooms.push(new Room(room));
  },
  getRoom: function (room) {
    return this.rooms.find(r => r.name === room);
  },
  removeRoom: function (room) {
    this.rooms = this.rooms.filter(r => r.name !== room);
  }
  ,
  removeRoombyname: function (name) {
    this.rooms = this.rooms.filter(r => r.name !== name);

  },
  getRooms: function () {
    return this.rooms;
  },
  getRoombyPlayerid: function (id) {
    return this.rooms.find(r => r.players.find(p => p.id === id));
  },
  getPlayers: function (room) {
    return this.rooms.find(r => r.name === room).players;
  },
  getPlayersNames: function (room) {
    return this.rooms.find(r => r.name === room).players.map(p => p.name);
  },
  addPlayer: function (room, player) {
    this.rooms.find(r => r.name === room).players.push(new Player(player.id, player.name));
  },
  removePlayer: function (room, player) {
    this.rooms.find(r => r.name === room).players = this.rooms.find(r => r.name === room).players.filter(p => p !== player);
  },
  getGameState: function (room) {
    return this.rooms.find(r => r.name === room).gameState;
  },
  getGSArtist: function (room) {
    return this.rooms.find(r => r.name === room).gameState.currentArtist;
  },
  getGSArtists: function (room) {
    return this.rooms.find(r => r.name === room).gameState.artists;
  },
  setGSArtists: function (room, artists) {
    this.rooms.find(r => r.name === room).gameState.artists = artists;
  },
  setGSArtist: function (room, artist) {
    this.rooms.find(r => r.name === room).gameState.currentArtist = artist;
  },
  setGSCurrentPlayer: function (room, player) {
    this.rooms.find(r => r.name === room).gameState.currentPlayer = player;
  },
  setGSTurn: function (room, turn) {
    this.rooms.find(r => r.name === room).gameState.turn = turn;
  },
  setGSParameters: function (room, parameters) {
    this.rooms.find(r => r.name === room).gameState.parameters = parameters;
  },
  setGSEnded: function (room, ended) {
    this.rooms.find(r => r.name === room).gameState.ended = ended;
  },
  setGSWinner: function (room, winner) {
    this.rooms.find(r => r.name === room).gameState.winner = winner;
  },

  setGameState: function (room, gameState) {
    this.rooms.find(r => r.name === room).gameState = gameState;
  },
  getParameters: function (room) {
    return this.rooms.find(r => r.name === room).gameState.parameters;
  },
  setParameters: function (room, parameters) {
    this.rooms.find(r => r.name === room).gameState.parameters = parameters;
  }
}

io.on("connection", socket => {
  console.log("a user connected", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected");
    let roomdel = storage.getRoombyPlayerid(socket.id);
    if (roomdel) {
      console.log(storage.getRooms());

      console.log(roomdel.name);
      storage.removeRoombyname(roomdel.name); //remove room
      console.log(storage.getRooms());
    }
  }
  );
  socket.on("create", (data) => {
    console.log("create", data[0]);
    socket.join(data[0]);
    storage.addRoom(data[0]);
    storage.addPlayer(data[0], { id: socket.id, name: data[1] });
    // console.log(storage.getRoom(data[0]));
    io.to(data[0]).emit("room", storage.getPlayersNames(data[0]));
  }
  );
  socket.on("join", (data) => {
    // console.log("join", data);
    socket.join(data[0]);
    storage.addPlayer(data[0], { id: socket.id, name: data[1] });
    io.to(data[0]).emit("room", storage.getPlayersNames(data[0]));
    // console.log(storage.rooms);
  }

  );
  socket.on("startGame", (data) => {
    console.log("startGame", data);
    io.to(data.room).emit("startGame", data.room);
  }
  );
  socket.on("players", (room) => {
    io.to(room).emit("players", storage.getPlayersNames(room));
    socket.emit("currentplayer", storage.getPlayersNames(room)[0]);
  });

  socket.on("answer", async (data) => {
    let room = data[2];
    let currplayer = data[1];
    let idxplayer = storage.getPlayersNames(room).indexOf(currplayer);
    storage.setGSCurrentPlayer(room, data[1]);
    storage.setGSTurn(room, storage.getGameState(room).turn + 1);
    io.to(room).emit("players", storage.getPlayersNames(room));
    let checking = await checkingfeaturing(`${data[0]} ${data[3]}`);
    if (checking === 'no featuring') {
      console.log('no featuring');
      storage.setGSEnded(room, true);
      idxplayer == storage.getPlayersNames(room).length - 1 ? idxplayer = 0 : idxplayer += 1;
      storage.setGSWinner(room, storage.getPlayersNames(room)[idxplayer]);
      socket.emit("end", storage.getGameState(room).ended);
    }
    else {
      storage.setGSArtist(room, data[0]);


      if (storage.getGSArtists(room).includes(data[0])) {
        console.log('artist found');
        storage.setGSEnded(room, true);
        idxplayer == storage.getPlayersNames(room).length - 1 ? idxplayer = 0 : idxplayer += 1;
        storage.setGSWinner(room, storage.getPlayersNames(room)[idxplayer]);
        socket.emit("end", storage.getGameState(room).ended);
        socket.emit("winner", storage.getGameState(room).winner);

      }
      storage.setGSArtists(room, [storage.getGSArtists(room), data[0]]);
      idxplayer == storage.getPlayersNames(room).length - 1 ? idxplayer = 0 : idxplayer += 1;
      storage.setGSCurrentPlayer(room, storage.getPlayersNames(room)[idxplayer]);
      io.to(room).emit("currentArtist", storage.getGameState(room).currentArtist);

    }
    io.to(room).emit("updateGS", storage.getGameState(room));
  });
  socket.on("getRandArtist", (room) => {
    console.log("getRandArtist", room);
    let artists = ['dinos', 'orelsan', 'alpha wann', 'kaaris', 'freeze corleone', 'laylow', 'damso', 'nekfeu', 'disiz', 'hamza', 'sch', 'la feve', 'zamdane', 'jul', 'alonzo'];
    const randomIndex = Math.floor(Math.random() * artists.length);
    storage.setGSArtist(room, artists[randomIndex]);
    storage.setGSArtists(room, artists[randomIndex]);
    storage.setGSTurn(room, storage.getGameState(room).turn + 1);
    storage.setGSCurrentPlayer(room, storage.getPlayersNames(room)[0]);
    io.to(room).emit("getRandArtist", artists[randomIndex]);
    io.to(room).emit("currentplayer", storage.getGameState(room).currentPlayer);

  });
  socket.on("gameParams", (data) => {
    console.log("gameParams", data);
    // game.gameState.parameters = data[1];
    storage.setGSParameters(data[0], data[1]);
    console.log(game.gameState.parameters);
    io.to(data[1]).emit("gameParams", data);

  })
  socket.on("endGame", (room) => {
    console.log("getGameState", room);
    io.to(room).emit("winner", storage.getGameState(room).winner);
  });

});

httpServer.listen(4000);
