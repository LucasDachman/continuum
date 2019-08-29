import Tone from 'tone';

export default class CSynth {
  constructor() {
    this.synth = new Tone.PolySynth(8, Tone.Synth, {
      oscillator: {
        type: 'sawtooth'
      }
    })
      .toMaster();
  }

  triggerAttack(frequency) {
    console.log('attack', frequency)
    this.synth.triggerAttack(frequency);
  }

  triggerRelease(frequency) {
    this.synth.triggerRelease(frequency);
  }

  start() {
    Tone.context.resume();
  }

  stop() {
    this.synth.releaseAll();
  }
}