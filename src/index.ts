const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Your existing server logic

io.on('connection', (socket) => {
  console.log('New client connected');

  // Emit activity updates
  const activityUpdate = {
    /* Your activity data */
  };
  socket.emit('activity', activityUpdate);

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3001, () => {
  console.log('Server is running on port 3001');
});