import Tone from 'tone';

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
  notes = notes.map(noteNumber => {
    const freq = Tone.Frequency(noteNumber, 'midi');
    const name = freq.toNote();
    return {
      name,
      frequency: freq.toFrequency(),
      color: name.includes('#') ? 'black' : 'white',
    }
  });
  return notes;
}