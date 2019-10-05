
import { midiToNote, nameToNote } from '../../util/notes-util';
import { scale } from '@tonaljs/scale';
import { range } from 'lodash';

export const numNotes = 14;
export const numSteps = 16;
export const startNote = 36;
// export const notes = generateNotes(startNote, startNote + numNotes);

export const notes = [...scale('B3 minor').notes, ...scale('B4 minor').notes].map(nameToNote);

export const createCompositionSliceConfig = () => ({
  initialState: range(numNotes)
    .map(i =>
      range(numSteps)
        .map(() => ({
          active: false,
          note: notes[i],
          keyIndex: i
        }))
    ),
  reducers: {
    setCompositionCell(state, action) {
      const { row, col, active } = action.payload;
      state.composition[row][col].active = active;
    },
    toggleCompositionCell(state, action) {
      const { row, col } = action.payload;
      state.composition[row][col].active = !state.composition[row][col].active;
    },
    transpose(state, action) {
      const { semitones } = action.payload;
      state.composition = state.composition
        .map(row => row.map(cell => midiToNote(cell.midi + semitones)));
    }
  }
});