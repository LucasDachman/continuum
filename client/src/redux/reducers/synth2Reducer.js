import { createSlice } from 'redux-starter-kit';
import { createCompositionSliceConfig } from '../config-creators/compositionReducerConfig';

const compositionReducerConfig = createCompositionSliceConfig();

const synth2Slice = createSlice({
  slice: 'synth2',
  initialState: {
    amp: {
      attack: 0,
      decay: 0.5,
      sustain: 1,
      release: 0.2
    },
    filter: {
      attack: 0,
      decay: 0.5,
      sustain: 1,
      release: 0.2,
      base: 0,
      range: 0.5,
      q: 0,
    },
    composition: compositionReducerConfig.initialState
  },
  reducers: {
    setAmp(state, action) {
      // allow for setting arbitrary values
      for (let [key, value] of Object.entries(action.payload)) {
        state.amp[key] = value;
      }
    },
    setFilter(state, action) {
      // allow for setting arbitrary values
      for (let [key, value] of Object.entries(action.payload)) {
        state.filter[key] = value;
      }
    },
    ...compositionReducerConfig.reducers
  }
});

export const { setAmp, setFilter, setCompositionCell } = synth2Slice.actions;
export default synth2Slice.reducer;