import Tone from 'tone';

export default class Sequencer {

  chords = []
  step = 0;
  frequencyOffset = 0;
  onTick = null;
  synth = null;
  loop = null;

  constructor({bpm, numSteps}) {
    this.chords = new Array(numSteps)
      .fill(null).map(v => []);

    Tone.Transport.bpm.value = bpm;
    Tone.Transport.start();
    this.loop = new Tone.Loop(this._loopCallback, '16n');
  }

  _loopCallback = (time) => {
    this._onTick(time, this.step);
    const nextChord = this._nextNotes().map(note => note + this.frequencyOffset * 10);
    nextChord.length > 0 &&
      this.synth.synth.triggerAttackRelease(nextChord, '16n', time);
  }

  _onTick(time, step) {
    if (!this.onTick) return;
    Tone.Draw.schedule(() => {
      this.onTick(step);
    }, time + 0.1)
  }

  _nextNotes() {
    let nextChord = this.chords[this.step] || [];
    this.step++;
    if (this.step >= this.chords.length) this.step = 0;
    return nextChord;
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

  start = () => {
    Tone.context.resume();
    // Tone.Transport.start();
    this.loop.start();
  }

  stop = () => {
    // Tone.Transport.stop();
    this.loop.stop();
    this.step = 0;
  }
}