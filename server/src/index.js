import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import { setupSocketEvents } from './socket-events.js';
import makeStore from 'continuum-shared/redux/store';
import {nodeLogger} from './util/middlewares';

const port = 4000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const store = makeStore([nodeLogger]);

io.set('transports', ['websocket']);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

io.on('connection', function (socket) {
  console.log('a user connected');
  setupSocketEvents(store, socket);
});

server.listen(port, () => console.log(`continuum-server listening on port ${port}!`));