import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import synth1Reducer from './reducers/synth1Reducer';
import bassReducer from '../BassSynth/bassReducer';
import lennyReducer from '../LennySynth/lennyReducer'
import utilReducer from './reducers/utilReducer';
import characterReducer from './reducers/characterReducer';

const makeStore = (middleware = [], initialState) => {
  return configureStore({
    reducer: {
      synth1: synth1Reducer,
      bass: bassReducer,
      lenny: lennyReducer,
      util: utilReducer,
      character: characterReducer,
    },
    middleware: [...getDefaultMiddleware(), ...middleware],
    ...initialState && { preloadedState: initialState }
  });
};

export default makeStore;