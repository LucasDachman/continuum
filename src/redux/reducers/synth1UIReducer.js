import { createSlice } from 'redux-starter-kit';

const synth1UISlice = createSlice({
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
    }
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
    }
  }
});

export const { setAmp, setFilter } = synth1UISlice.actions;
export default synth1UISlice.reducer;