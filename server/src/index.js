import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import { setupSocketEvents } from './socket-events.js';

const port = process.env.PORT ? process.env.PORT : 4000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.set('transports', ['websocket']);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

io.on('connection', function (socket) {
  setupSocketEvents(socket);
});

server.listen(port, () => console.log(`continuum-server listening on port ${port}!`));