import { createSlice } from 'redux-starter-kit';
import { createCompositionSliceConfig } from '../redux/config-creators/compositionReducerConfig';

const compositionReducerConfig = createCompositionSliceConfig();

const lennySlice = createSlice({
  slice: 'lenny',
  initialState: {
    reverb: 0,
    composition: compositionReducerConfig.initialState
  },
  reducers: {
    ...compositionReducerConfig.reducers,
    setReverb(state, action) {
      state.reverb = action.payload;
    }
  }
});

export const {
  setCompositionCell,
  toggleCompositionCell,
  setReverb
} = lennySlice.actions
export default lennySlice.reducer;

