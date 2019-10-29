import { createSlice } from 'redux-starter-kit';

const MAX = 20;

const setNumActive = (state, action) => {
  const { active } = action.payload;
  if (active) {
    state.numActive += 1;
  } else {
    state.numActive -= 1;
  }
  if (state.numActive >= MAX) {
    state.maxReached = true;
  } else {
    state.maxReached = false;
  }
}

const utilSlice = createSlice({
  initialState: {
    message: 'Hello, World',
    startTime: null,
    nextInterval: 0,
    numActive: 0,
    maxReached: false,
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
    },
  },
  extraReducers: {
    'bass/setCompositionCell': setNumActive,
    'lenny/setCompositionCell': setNumActive,
    'drummer/setCompositionCell': setNumActive,
  }
});

export const {
  setMessage,
  setStartTime,
  setNextInterval,
} = utilSlice.actions;
export default utilSlice.reducer;