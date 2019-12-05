import io from 'socket.io-client';
import makeStore from '../redux/store';
import { setCharacter } from '../redux/reducers/characterReducer';
import { setCountDown } from '../redux/reducers/utilReducer';

const blackList = [
  'setCharacter',
  'setNextInterval',
  'setCountDown'
]

const charOverride = process.env.REACT_APP_CHAR;

const makeActionEmitter = socket => store => next => action => {
  const result = next(action);
  if (!(blackList.includes(action.type)) && !action.origin) {
    socket.emit('action', { ...action, origin: socket.id });
  }
  return result;
}

export const makeStoreWithSocket = async () => {
  const socket = io(process.env.REACT_APP_SERVER_URI, { transports: ['websocket'] });

  let character;
  // wait for initial state from server before creating store
  const initialState = await new Promise(resolve => {
    socket.on('init', config => {
      console.log(config);
      console.log('You are player ', config.character);
      character = charOverride ? charOverride : config.character;
      resolve(config.state);
    });
  });

  const actionEmitter = makeActionEmitter(socket);
  const store = makeStore([actionEmitter], initialState);

  store.dispatch(setCharacter({ character }));

  socket.on('action', action => {
    store.dispatch(action);
  });

  socket.on('GET_STATE', (_, cb) => {
    const { character, ...rest } = store.getState();
    cb(rest);
  });

  !charOverride &&
  socket.on('CHARACTER_CHANGE', ({ charactersById }) => {
    const character = charactersById[socket.id];
    const countDown = (count) => {
      setTimeout(() => {
        if (count >= 0) {
            store.dispatch(setCountDown(count));
            if (count === 0) {
              store.dispatch(setCountDown('Swap!'))
              store.dispatch(setCharacter({ character }))
            }
            countDown(count - 1);
        } else {
          store.dispatch(setCountDown(null))
        }
      }, 1000);
    }
    countDown(5);
  });

  return store;
}
