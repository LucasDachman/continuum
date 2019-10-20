
// in-memory state, this needs to be put somewhere else
const INTERVAL_TIME = process.env.I ? process.env.I : 60000;
const characterOrder = ['bass', 'lenny', 'drummer'];
const numCharacters = characterOrder.length;
let users = {};
let intervalSet = false;

export const setupSocketEvents = (socket, ioServer) => {

  if (!intervalSet) {
    intervalSet = true;
    setInterval(() => {
      users = Object.entries(users).reduce((acc, [id, character], i) => {
        const position = characterOrder.indexOf(character)
        const newChar = characterOrder[(position + 1) % numCharacters]
        acc[id] = newChar;
        return acc;
      }, {});
      console.group('Character change');
      console.log(users);
      console.groupEnd();
      ioServer.sockets.emit('CHARACTER_CHANGE', { charactersById: users });
    }, INTERVAL_TIME);
  }

  // prevent extra users from joining
  const roomFull = Object.values(users).length === characterOrder.length;
  if (roomFull) {
    socket.emit('init', 'Session Full 🤷‍');
    socket.disconnect(true);
    return;
  }
  // find the first available character
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
    socket.emit('init', { character, numUsers });
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
