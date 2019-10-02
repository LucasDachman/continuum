import Tone from 'tone';

export default class BassSynthAudio {
  name = null;
  constructor(name) {
    if (!name) {
      throw new Error('CSynth constructor requires a name');
    }
    this.name = name;
    this.synth = new Tone.PolySynth(1, Tone.MonoSynth)
      .chain(
        new Tone.Limiter(),
        Tone.Master
      );
    this.synth.set({
      volume: -12,
      detune: -3200,
      oscillator: {
        type: 'sawtooth'
      },
      envelope: {
        attack: 0.01,
        sustain: 1,
        decay: 0.05
      },
      filter: {
        baseFrequency: 6,
      },
      filterEnvelope: {
        sustain: 0.47415415352178325,
      }
    });
  }

  triggerAttack = (frequency) => {
    this.synth.triggerAttack(frequency);
  }

  triggerRelease = (frequency) => {
    this.synth.triggerRelease(frequency);
  }

  triggerAttackRelease = (notes, length, time) => {
    this.synth.triggerAttackRelease(notes, length, time);
  }

  setLength = ratio => {
    this.synth.set({
      envelope: {
        release: (ratio * 10) + 0.01
      },
      filterEnvelope: {
        release: (ratio * 100) + 0.01
      }
    })
  }

  setShape = ratio => {
    this.synth.set({
      filterEnvelope: {
        attack: (ratio / 5) + 0.01
      }
    });
  }

  setFilterDecay = (ratio) => {
    this.synth.set({
      filterEnvelope: {
        decay: ratio + 0.01
      }
    });
  }

  setFilterRange = (ratio) => {
    this.synth.set({
      filterEnvelope: {
        octaves: ratio * 20
      }
    });
  }

  setFilterQ = (ratio) => {
    this.synth.set({
      filter: {
        Q: ratio * 10
      }
    })
  }
}