import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import synth1UIReducer from './reducers/synth1UIReducer';
import utilReducer from './reducers/utilReducer';

const makeStore = (middleware) => {
  middleware = middleware ? middleware : [];
  return configureStore({
    reducer: {
      synth1UI: synth1UIReducer,
      util: utilReducer,
    },
    middleware: [...getDefaultMiddleware(), ...middleware]
  })
};

export default makeStore;