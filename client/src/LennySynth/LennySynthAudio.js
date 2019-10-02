import Tone from 'tone';
import {mapRange} from '../util/util';

export default class LennySynthAudio {
  name = null;
  constructor(name) {
    if (!name) {
      throw new Error('CSynth constructor requires a name');
    }
    this.name = name;

    this.reverb = new Tone.Freeverb();
    this.vibrato = new Tone.Vibrato();
    this.phaser = new Tone.Phaser({
      frequency: 0.4,
      octaves: 2,
      baseFrequency: 200,
      Q: 18,
      stages: 20,
    });
    this.phaser.wet.value = 1;
    this.synth = new Tone.PolySynth(6, Tone.MonoSynth)
      .chain(
        this.vibrato,
        this.reverb,
        this.phaser,
        new Tone.Limiter(),
        Tone.Master
      );
    this.synth.set({
      volume: -12,
      detune: -1200,
      oscillator: {
        type: 'triangle'
      },
      filterEnvelope: {
        attack: 0.01,
        decay: 1,
        sustain: 1,
      },
      filter: {
        Q: 0
      }
    });
  }

  triggerAttackRelease = (notes, length, time) => {
    this.synth.triggerAttackRelease(notes, length, time);
  }

  setReverb = ratio => {
    // this.reverb.decay = ratio * 8;
    // this.reverb.wet.value = mapRange(ratio, 0, 1, 0.0, 0.9);
    this.reverb.roomSize.value = mapRange(ratio, 0, 1, 0.2, 1);
  }

  setLength = ratio => {
    this.synth.set({
      envelope: {
        release: (ratio * 8) + 0.01
      },
      filterEnvelope: {
        release: (ratio * 80) + 0.01
      }
    });
  }

  setPhaser = state => {
    if (state) {
      this.phaser.wet.value = 1
    } else {
      this.phaser.wet.value = 0
    }
  }

  setVibratoDepth = ratio => {
    this.vibrato.depth.value = ratio;
  }
}
