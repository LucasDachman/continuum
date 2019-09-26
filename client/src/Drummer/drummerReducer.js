import { createSlice } from 'redux-starter-kit';
import { createCompositionSliceConfig } from '../redux/config-creators/compositionReducerConfig';

const compositionSliceConfig = createCompositionSliceConfig();

const drummerSlice = createSlice({
  slice: 'drummer',
  initialState: {
    composition: compositionSliceConfig.initialState
  },
  reducers: {
    ...compositionSliceConfig.reducers
  }
});

export const { setCompositionCell, toggleCompositionCell } = drummerSlice.actions;
export default drummerSlice.reducer;