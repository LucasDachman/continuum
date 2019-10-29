import { createSlice } from 'redux-starter-kit';
import { createCompositionSliceConfig } from '../redux/config-creators/compositionReducerConfig';

const compositionReducerConfig = createCompositionSliceConfig();

const lennySlice = createSlice({
  slice: 'lenny',
  initialState: {
    reverb: 0,
    length: 0.25,
    phaser: false,
    vibratoDepth: 0.1,
    ...compositionReducerConfig.initialState
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
    },
    setVibratoDepth(state, action) {
      state.vibratoDepth = action.payload;
    }
  }
});

export const {
  setCompositionCell,
  setReverb,
  setLength,
  setPhaser,
  setVibratoDepth
} = lennySlice.actions
export default lennySlice.reducer;

