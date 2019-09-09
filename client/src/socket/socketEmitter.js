import io from 'socket.io-client';

export const createEmitter = () => {

  const socket = io('http://localhost:4000');

  return [
    store => next => action => {
      if (!action.origin) {
        socket.emit('action', { ...action, origin: socket.id });
      }
      return next(action);
    },
    store => {
      socket.on('action', action => {
        if (action.origin !== socket.id) {
          store.dispatch(action);
        }
      });
    }]
}
