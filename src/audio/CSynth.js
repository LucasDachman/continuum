import Tone from 'tone';

export default class CSynth {
  constructor() {
    this.synth = new Tone.PolySynth(4, Tone.Synth)
      .toMaster();
  }

  triggerAttack(frequency) {
    this.synth.triggerAttack(frequency);
  }

  triggerRelease(frequency) {
    this.synth.triggerRelease(frequency);
  }
}