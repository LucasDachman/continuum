
// in-memory state, this needs to be put somewhere else
const characterOrder = ['bass', 'lenny', 'drummer'];
const numCharacters = characterOrder.length;
// let characters = ['drummer']
let users = {};
let intervalSet = false;

export const setupSocketEvents = (socket, ioServer) => {

  if (!intervalSet) {
    intervalSet = true;
    setInterval(() => {
      users = Object.entries(users).reduce((acc, [id, character], i) => {
        console.log({ id, character })
        const position = characterOrder.indexOf(character)
        const newChar = characterOrder[(position + 1) % numCharacters]
        acc[id] = newChar;
        return acc;
      }, {});
      ioServer.sockets.emit('CHARACTER_CHANGE', { charactersById: users });
    }, 20000);
  }

  // prevent extra users from joining
  const roomFull = Object.values(users).length === characterOrder.length;
  if (roomFull) {
    socket.emit('init', 'Session Full 🤷‍');
    socket.disconnect(true);
    return;
  }
  const character = users[socket.id] = characterOrder.find(char => !(Object.values(users).includes(char)));

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
    socket.emit('init', { character, numUsers, startTime: Date.now() });
  }

  console.log(`User ${socket.id} (${character}) has joined the session.`)


  // broadcast redux actions to all other users
  socket.on('action', action => {
    socket.broadcast.emit('action', action);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} (${users[socket.id]}) has left the session.`)
    // remove the character from list of users
    delete users[socket.id];
  });
};
