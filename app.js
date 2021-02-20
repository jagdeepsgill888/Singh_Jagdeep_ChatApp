const { Socket } = require('dgram');
const express = require('express');
const { connect } = require('http2');
const path = require('path');

const messenger = require('socket.io')();

const app = express();

app.use(express.static("public"));
const port = process.env.PORT || 5050;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/chat", (req, res) => {
    res.sendFile(path.join(__dirname, "chat.html"));
});

const server = app.listen(port, () => {
    console.log(`app is running on ${port}`);
});

// messenger is the connection manager - like a switchboard operator
messenger.attach(server);

// socket is the individual connection - the caller
messenger.on('connection', (socket) => {
    
  console.log(`a user connected: ${socket.id}`);

  

  // send the connected user their assigned ID
  socket.emit('connected', { sID: `${socket.id}`, message: 'new connection'});
  console.log('connection', Object.keys(socket.connected).length);
  


  socket.on('chatmessage', function(msg) {
      console.log(msg);
      messenger.emit('message', { id: socket.id, message: msg, timeStamp: msg.timeStamp});
      
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
    console.log('a user is typing');
  });

  socket.on("stopTyping", () => {
    socket.broadcast.emit("stopTyping", data);
    console.log('a user stopped typing');
  });


  socket.on('disconnect', () => {
      console.log('a user has disconnected');
  })
});