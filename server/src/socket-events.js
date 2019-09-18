export const setupSocketEvents = (socket) => {
  socket.on('action', action => {
    socket.broadcast.emit('action', action);
  });
};
