import { createSlice } from 'redux-starter-kit';
import { createCompositionSliceConfig } from '../redux/config-creators/compositionReducerConfig';

const compositionReducerConfig = createCompositionSliceConfig();

const lennySlice = createSlice({
  slice: 'lenny',
  initialState: {
    reverb: 0,
    length: 0.25,
    phaser: false,
    composition: compositionReducerConfig.initialState
  },
  reducers: {
    ...compositionReducerConfig.reducers,
    setReverb(state, action) {
      state.reverb = action.payload;
    },
    setLength(state, action) {
      state.length = action.payload;
    },
    setPhaser(state, action) {
      state.phaser = action.payload; 
    }
  }
});

export const {
  setCompositionCell,
  toggleCompositionCell,
  setReverb,
  setLength,
  setPhaser
} = lennySlice.actions
export default lennySlice.reducer;

