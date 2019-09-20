export default class Sequence {

  chords = []
  synth = null;
  frequencyOffset = 0;

  constructor(synth, numSteps) {
    this.synth = synth;
    this.chords = new Array(numSteps)
      .fill(null).map(v => []);
  }

  getNotes(step) {
    let chord = this.chords[step] || [];
    return chord.map(note => note + this.frequencyOffset * 10);;
  }

  addNote = ({ index, freq }) => {
    const chord = this.chords[index];
    if (!chord.includes(freq)) {
      chord.push(freq);
    }
  }

  removeNote = ({ index, freq }) => {
    this.chords[index] = this.chords[index].filter(value => value !== freq);
  }

}