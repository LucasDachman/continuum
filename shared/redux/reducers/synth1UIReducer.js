import { createSlice } from 'redux-starter-kit';
import { generateNotes } from '../../util/notes-util'


const numNotes = 24;
const numSteps = 8;
const startNote = 36;
const notes = generateNotes(startNote, startNote + numNotes);

const initialComposition =
  new Array(numNotes)
    .fill(null)
    .map((_, i) => new Array(numSteps).fill(null)
      .map(() => ({
        active: false,
        note: notes[i],
      }))
    );

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
    },
    composition: initialComposition,
    numNotes,
    numSteps,
    startNote,
    notes
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
    },
    setCompositionCell(state, action) {
      const { row, col, active } = action.payload;
      state.composition[row][col].active = active;
    }
  }
});

export const { setAmp, setFilter, setCompositionCell } = synth1UISlice.actions;
export default synth1UISlice.reducer;