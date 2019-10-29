import { createSlice } from 'redux-starter-kit';
import { createCompositionSliceConfig } from '../redux/config-creators/compositionReducerConfig';

const compositionReducerConfig = createCompositionSliceConfig();

const bassSlice = createSlice({
  slice: 'bass',
  initialState: {
    length: 0.07,
    shape: 0,
    filter: {
      decay: 0.5,
      range: 0.3769,
      q: 0.1,
    },
    ...compositionReducerConfig.initialState
  },
  reducers: {
    ...compositionReducerConfig.reducers,
    setLength(state, action) {
      state.length = action.payload;
    },
    setShape(state, action) {
      state.shape = action.payload;
    },
    setFilterDecay(state, action) {
      state.filter.decay = action.payload;
    },
    setFilterRange(state, action) {
      state.filter.range = action.payload;
    },
    setFilterQ(state, action) {
      state.filter.q = action.payload;
    },
  }
});

export const {
  setCompositionCell,
  setLength,
  setShape,
  setFilterDecay,
  setFilterRange,
  setFilterQ,
} = bassSlice.actions;
export default bassSlice.reducer;