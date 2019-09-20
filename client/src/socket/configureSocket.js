import io from 'socket.io-client';

export const configureSocket = async () => {

  const socket = io(process.env.REACT_APP_SERVER_URI, { transports: ['websocket'] });

  const initialState = await new Promise(resolve => {

    socket.on('init', config => {

      console.log(config);
      console.log('You are player ', config.character);
      resolve(config.state);
    });

  });


  return {
    // redux middleware
    actionEmitter: store => next => action => {
      const result = next(action);
      if (!action.origin) {
        socket.emit('action', { ...action, origin: socket.id });
      }
      return result;
    },
    // listen for actions
    setupActionListener: store => {
      socket.on('action', action => {
        store.dispatch(action);
      });


      socket.on('GET_STATE', (_, cb) => {
        cb(store.getState());
      });
    },
    initialState
  };
}
