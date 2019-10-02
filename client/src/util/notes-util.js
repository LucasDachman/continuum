import Tone from 'tone';

/**
 * https://pages.mtu.edu/~suits/west_scales.html
 * https://www.musicnotes.com/now/tips/circle-of-fifths-guide/
 * https://github.com/tonaljs/tonal/blob/master/packages/scale-dictionary/data.ts
 */

// helper functions
export function isBlack(note) {
  return note.color === 'black';
}

export function isWhite(note) {
  return note.color === 'white'
}

export function generateNotes(startNote = 0, endNote = 127) {
  if (startNote < 0 || endNote > 127) {
    console.error('note out of range');
    return;
  }

  let notes = new Array(endNote - startNote).fill(0).map((_, i) => i + startNote);
  notes = notes.map(midiToNote);
  return notes;
}

export const midiToNote = noteNumber => {
  const freq = Tone.Frequency(noteNumber, 'midi');
  const name = freq.toNote();
  return {
    name,
    frequency: freq.toFrequency(),
    color: name.includes('#') ? 'black' : 'white',
    midi: noteNumber
  }
}

export const octaveNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
