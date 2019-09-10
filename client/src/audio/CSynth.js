import Tone from 'tone';

export default class CSynth {
  constructor({ bpm, numSteps }) {
    // this.loop.humanize = true;
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.start();

    this.synth = new Tone.PolySynth(6, Tone.MonoSynth).toMaster();
    this.synth.set({
      oscillator: {
        type: 'sawtooth'
      },
    });
    this.chords = new Array(numSteps)
      .fill(null).map(v => []);
    this.step = 0;
    this.frequencyOffset = 0;
    this.loop = new Tone.Loop(this._loopCallback, '16n')
  }

  _loopCallback = (time) => {
    this._onTick(time, this.step);
    const nextChord = this._nextNotes().map(note => note + this.frequencyOffset * 10);
    nextChord.length > 0 &&
      this.synth.triggerAttackRelease(nextChord, '16n', time);
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