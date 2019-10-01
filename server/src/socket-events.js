
// in-memory state, this needs to be put somewhere else
// let characters = ['drummer', 'lenny', 'bass'];
let characters = ['drummer', 'lenny']
let users = {};

export const setupSocketEvents = (socket, ioServer) => {

  // prevent extra users from joining
  if (characters.length === 0) {
    socket.emit('init', 'Session Full 🤷‍');
    socket.disconnect(true);
    return;
  }
  const character = users[socket.id] = characters.shift();

  // send initial state if someone is already in the session
  const numUsers = Object.keys(users).length
  if (numUsers > 1) {
    const userId = Object.keys(users).filter(id => id !== socket.id)[0];

    // get state from another user
    ioServer.sockets.connected[userId].emit('GET_STATE', null, state => {
      socket.emit('init', {
        character,
        numUsers,
        state
      });
    });
  }
  else {
    socket.emit('init', { character, numUsers });
  }

  console.log(`User ${socket.id} (${character}) has joined the session.`)


  // broadcast redux actions to all other users
  socket.on('action', action => {
    socket.broadcast.emit('action', action);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} (${users[socket.id]}) has left the session.`)
    // add the character back
    characters.push(users[socket.id]);
    // remove the character from list of users
    delete users[socket.id];
  });
};
