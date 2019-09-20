
// in-memory state, this needs to be put somewhere else
let characters = [1, 2];
let users = {};

export const setupSocketEvents = (socket) => {

  if (characters.length === 0) {
    socket.emit('init', 'Session Full 🤷‍');
    socket.disconnect(true);
    return;
  }

  users[socket.id] = characters.shift();
  console.log(`User ${socket.id} (character ${users[socket.id]}) has joined the session.`)
  socket.emit('init', { character: users[socket.id] });

  // broadcast redux actions to all other users
  socket.on('action', action => {
    socket.broadcast.emit('action', action);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} (character: ${users[socket.id]}) has left the session.`)
    // add the character back
    characters.push(users[socket.id]);
    // remove the character from list of users
    delete users[socket.id];
  });
};
