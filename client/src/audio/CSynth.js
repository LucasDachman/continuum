import Tone from 'tone';

export default class CSynth {
  constructor() {
    this.synth = new Tone.PolySynth(6, Tone.MonoSynth)
      .chain(
        new Tone.Limiter(),
        Tone.Master
      );
    this.synth.set({
      volume: -12,
      oscillator: {
        type: 'sawtooth'
      },
    });
  }

  triggerAttack = (frequency) => {
    this.synth.triggerAttack(frequency);
  }

  triggerRelease = (frequency) => {
    this.synth.triggerRelease(frequency);
  }

  setAmpAttack = (ratio) => {
    this.synth.set({
      envelope: {
        attack: ratio + 0.01
      }
    });
  }

  setAmpDecay = (ratio) => {
    this.synth.set({
      envelope: {
        decay: ratio + 0.01
      }
    });
  }

  setAmpSustain = (ratio) => {
    this.synth.set({
      envelope: {
        sustain: ratio
      }
    });
  }

  setAmpRelease = (ratio) => {
    this.synth.set({
      envelope: {
        release: (ratio * 10) + 0.01
      }
    });
  }

  setFilterAttack = (ratio) => {
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

  setFilterSustain = (ratio) => {
    this.synth.set({
      filterEnvelope: {
        sustain: ratio
      }
    });
  }

  setFilterRelease = (ratio) => {
    this.synth.set({
      filterEnvelope: {
        release: (ratio * 100) + 0.01
      }
    });
  }

  setFilterBase = (ratio) => {
    this.synth.set({
      filterEnvelope: {
        baseFrequency: (ratio * 500) + 1
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