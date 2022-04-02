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

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });
app.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});

app.get("/xD", (req, res) => {
  StartGame();
})

let interval;

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

io.on('connection', function(socket) {
  socket.on('create', function(room) {
    socket.join(room);
    console.log(`${socket.id} joined ${room}`);
  });
});

// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//       io.emit('chat message', msg);
//     });
//   });