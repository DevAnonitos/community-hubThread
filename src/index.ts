const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

import { Server } from 'socket.io';
const io = new Server(server, {
  cors: {
    origin: `*`,
  },
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('input-change', msg => {
    socket.broadcast.emit('update-input', msg);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3001, () => {
  console.log('✔️ Server listening on port 3001')
});
