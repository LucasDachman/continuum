import { configureStore } from 'redux-starter-kit';
import synth1UIReducer from './reducers/synth1UIReducer';

const store = configureStore({
  reducer: {
    synth1UI: synth1UIReducer,
  }
});

export default store;