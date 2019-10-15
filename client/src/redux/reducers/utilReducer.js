import { createSlice } from 'redux-starter-kit';

const utilSlice = createSlice({
  initialState: {
    message: 'Hello, World',
    startTime: null,
    nextInterval: 0,
  },
  reducers: {
    setMessage(state, action) {
      console.log('change to ', action.payload);
      state.message = action.payload;
    },
    setStartTime(state, action) {
      state.startTime = action.payload;
    },
    setNextInterval(state, action) {
      state.nextInterval = action.payload;
    }
  }
});

export const { setMessage, setStartTime, setNextInterval } = utilSlice.actions;
export default utilSlice.reducer;