import { createSlice } from 'redux-starter-kit';
import { createCompositionSliceConfig } from '../redux/config-creators/compositionReducerConfig';

const compositionSliceConfig = createCompositionSliceConfig();

const drummerSlice = createSlice({
  slice: 'drummer',
  initialState: {
    composition: compositionSliceConfig.initialState,
    filterFreq: 1,
  },
  reducers: {
    ...compositionSliceConfig.reducers,
    setFilterFreq(state, action) {
      state.filterFreq = action.payload;
    }
  }
});

export const { 
  setCompositionCell, 
  toggleCompositionCell,
  setFilterFreq
} = drummerSlice.actions;
export default drummerSlice.reducer;