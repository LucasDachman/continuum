import Tone from 'tone';
import { throwStatement } from '@babel/types';

export default class LennySynthAudio {
  name = null;
  constructor(name) {
    if (!name) {
      throw new Error('CSynth constructor requires a name');
    }
    this.name = name;

    this.reverb = new Tone.Reverb();
    this.reverb.decay = 8;
    this.reverb.generate();
    this.synth = new Tone.PolySynth(6, Tone.MonoSynth)
      .chain(
        this.reverb,
        new Tone.Limiter(),
        Tone.Master
      );
    this.synth.set({
      volume: -12,
      detune: 1200,
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
    this.reverb.wet.value = ratio;
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

}
