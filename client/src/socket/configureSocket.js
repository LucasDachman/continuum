import io from 'socket.io-client';
import makeStore from '../redux/store';

const makeActionEmitter = socket => store => next => action => {
  const result = next(action);
  if (!action.origin) {
    socket.emit('action', { ...action, origin: socket.id });
  }
  return result;
}

export const makeStoreWithSocket = async () => {
  const socket = io(process.env.REACT_APP_SERVER_URI, { transports: ['websocket'] });

  // wait for initial state from server before creating store
  const initialState = await new Promise(resolve => {
    socket.on('init', config => {
      console.log(config);
      console.log('You are player ', config.character);
      resolve(config.state);
    });
  });

  const actionEmitter = makeActionEmitter(socket);
  const store = makeStore([actionEmitter], initialState)

  socket.on('action', action => {
    store.dispatch(action);
  });

  socket.on('GET_STATE', (_, cb) => {
    cb(store.getState());
  });

  return store;
}
