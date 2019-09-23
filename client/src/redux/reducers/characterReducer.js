import { createSlice } from 'redux-starter-kit';

const characterSlice = createSlice({
  initialState: {
    character: null,
  },
  reducers: {
    setCharacter(state, action) {
      state.character = action.payload.character;
    }
  }
});

export const { setCharacter } = characterSlice.actions;
export default characterSlice.reducer;