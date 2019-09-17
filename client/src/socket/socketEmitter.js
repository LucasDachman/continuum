import io from 'socket.io-client';

export const createEmitter = () => {

  const socket = io('http://localhost:4000', {transports: ['websocket']});

  return [
    // redux middleware
    store => next => action => {
      const result = next(action);
      if (!action.origin) {
        socket.emit('action', { ...action, origin: socket.id });
      }
      return result;
    },
    // listen for actions
    store => {
      socket.on('action', action => {
        store.dispatch(action);
      });
    }]
}
