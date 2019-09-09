import { createSlice } from 'redux-starter-kit';

const utilSlice = createSlice({
  initialState: {
    message: 'Hello, World'
  },
  reducers: {
    setMessage(state, action) {
      console.log('change to ', action.payload);
      state.message = action.payload;
    }
  }
});

export const { setMessage } = utilSlice.actions;
export default utilSlice.reducer;