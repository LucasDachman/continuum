import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import synth1Reducer from './reducers/synth1Reducer';
import synth2Reducer from './reducers/synth2Reducer';
import utilReducer from './reducers/utilReducer';

const makeStore = (middleware = [], initialState) => {
  return configureStore({
    reducer: {
      synth1: synth1Reducer,
      synth2: synth2Reducer,
      util: utilReducer,
    },
    middleware: [...getDefaultMiddleware(), ...middleware],
    preloadedState: initialState
  });
};

export default makeStore;