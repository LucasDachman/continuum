export const setupSocketEvents = (store, socket) => {
  socket.on('action', action => {
    store.dispatch(action);
    socket.broadcast.emit('action', action);
  });
};
