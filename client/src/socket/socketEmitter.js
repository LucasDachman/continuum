import io from 'socket.io-client';

export const createEmitter = () => {

  const socket = io(process.env.REACT_APP_SERVER_URI, {transports: ['websocket']});

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
