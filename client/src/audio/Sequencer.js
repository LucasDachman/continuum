import Tone from 'tone';
import Sequence from './Sequence';

export default class Sequencer {

  step = 0;
  numSteps = 0;
  onTick = null;
  loop = null;
  sequences = {};

  constructor({ bpm, numSteps }) {
    this.numSteps = numSteps;
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.start('+0.1');

    this.loop = new Tone.Loop(this._loopCallback, '16n');
    this.loop.humanize = true;
  }

  _loopCallback = (time) => {
    // UI callback
    this._onTick(time, this.step);
    // trigger notes for each sequence
    for (const seq of Object.values(this.sequences)) {
      const nextChord = seq.getNotes(this.step)
      nextChord.length > 0 &&
        seq.synth.triggerAttackRelease(nextChord, '16n', time);
    }
    this.step++;
    if (this.step >= this.numSteps) this.step = 0;
  }

  _onTick(time, step) {
    if (step === 0 && this.onLoop) {
      Tone.Draw.schedule(() => {
        this.onLoop(Date.now());
      }, time);
    }
    if (this.onTick) {
      Tone.Draw.schedule(() => {
        this.onTick(step);
      }, time)
    }
  }

  createSequence = (synth) => {
    this.sequences[synth.name] = new Sequence(synth, this.numSteps);
  }

  start = () => {
    Tone.context.resume();
    this.loop.start();
  }

  stop = () => {
    this.loop.stop();
    this.step = 0;
  }
}