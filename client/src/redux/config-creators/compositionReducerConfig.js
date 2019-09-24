
import { generateNotes } from '../../util/notes-util';

export const numNotes = 24;
export const numSteps = 16;
export const startNote = 36;
export const notes = generateNotes(startNote, startNote + numNotes);

export const createCompositionSliceConfig = () => ({
  initialState: new Array(numNotes)
    .fill(null)
    .map((_, i) => new Array(numSteps).fill(null)
      .map(() => ({
        active: false,
        note: notes[i],
      }))
    ),
  reducers: {
    setCompositionCell(state, action) {
      const { row, col, active } = action.payload;
      state.composition[row][col].active = active;
    }
  }
});