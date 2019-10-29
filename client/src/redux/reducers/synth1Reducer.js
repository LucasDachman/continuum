import { createSlice } from 'redux-starter-kit';
import { createCompositionSliceConfig } from '../config-creators/compositionReducerConfig';

const compositionReducerConfig = createCompositionSliceConfig();

const synth1Slice = createSlice({
  slice: 'synth1',
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
    ...compositionReducerConfig.initialState
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

export const { setAmp, setFilter, setCompositionCell } = synth1Slice.actions;
export default synth1Slice.reducer;