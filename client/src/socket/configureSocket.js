import io from 'socket.io-client';
import makeStore from '../redux/store';
import { setCharacter } from '../redux/reducers/characterReducer';
import { setStartTime } from '../redux/reducers/utilReducer';

const blackList = [
  'setCharacter'
]

const makeActionEmitter = socket => store => next => action => {
  const result = next(action);
  if (!(blackList.includes(action.type)) && !action.origin) {
    socket.emit('action', { ...action, origin: socket.id });
  }
  return result;
}

export const makeStoreWithSocket = async () => {
  const socket = io(process.env.REACT_APP_SERVER_URI, { transports: ['websocket'] });

  let character, startTime;
  // wait for initial state from server before creating store
  const initialState = await new Promise(resolve => {
    socket.on('init', config => {
      console.log(config);
      console.log('You are player ', config.character);
      character = config.character;
      startTime = config.startTime;
      resolve(config.state);
    });
  });

  const actionEmitter = makeActionEmitter(socket);
  const store = makeStore([actionEmitter], initialState);

  store.dispatch(setCharacter({ character }));
  store.dispatch(setStartTime(startTime));

  socket.on('action', action => {
    store.dispatch(action);
  });

  socket.on('GET_STATE', (_, cb) => {
    const { character, ...rest } = store.getState();
    cb(rest);
  });

  return store;
}
