import { createSlice } from 'redux-starter-kit';

const utilSlice = createSlice({
  initialState: {
    message: 'Hello, World',
    startTime: null
  },
  reducers: {
    setMessage(state, action) {
      console.log('change to ', action.payload);
      state.message = action.payload;
    },
    setStartTime(state, action) {
      state.startTime = action.payload;
    }
  }
});

export const { setMessage, setStartTime } = utilSlice.actions;
export default utilSlice.reducer;