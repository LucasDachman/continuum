import Tone from 'tone';

export default class CSynth {
  constructor(bpm) {
    // this.loop.humanize = true;
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.start();

    this.synth = new Tone.PolySynth(6, Tone.MonoSynth).toMaster();
    this.synth.set({
      oscillator: {
        type: 'sawtooth'
      },
      filter: {
        Q: 0
      },
      filterEnvelope: {
        baseFrequency: 100,
        octaves: 4.5,
        release: 10
      }
    });
    this.chords = new Array(16)
      .fill(null).map(v => []);
    this.step = 0;

    this.loop = new Tone.Loop(this.loopCallback, '16n')
  }

  loopCallback = (time) => {
    this._onTick(time, this.step);
    const nextChord = this.nextNotes();
    // console.log('next chord:', nextChord)
    nextChord.length > 0 &&
      this.synth.triggerAttackRelease(nextChord, '16n', time);
  }

  _onTick(time, step) {
    if (!this.onTick) return;
    Tone.Draw.schedule(() => {
      this.onTick(step);
    }, time + 0.1)
  }

  nextNotes() {
    let nextChord = this.chords[this.step] || [];
    this.step++;
    if (this.step >= this.chords.length) this.step = 0;
    // find probabilities for each note
    return nextChord;
  }

  addNote({ index, freq }) {
    const chord = this.chords[index];
    if (!chord.includes(freq)) {
      chord.push(freq);
    }
  }

  removeNote({ index, freq }) {
    this.chords[index] = this.chords[index].filter(value => value !== freq);
  }

  triggerAttack(frequency) {
    this.synth.triggerAttack(frequency);
  }

  triggerRelease(frequency) {
    this.synth.triggerRelease(frequency);
  }

  setNotes(chords) {
    this.chords = chords;
  }

  setAmpAttack(ratio) {
    this.synth.set({
      envelope: {
        attack: ratio + 0.01
      }
    });
  }

  setAmpDecay(ratio) {
    this.synth.set({
      envelope: {
        decay: ratio + 0.01
      }
    });
  }

  setAmpSustain(ratio) {
    this.synth.set({
      envelope: {
        sustain: ratio
      }
    });
  }

  setAmpRelease(ratio) {
    this.synth.set({
      envelope: {
        release: (ratio * 10) + 0.01
      }
    });
  }

  start() {
    Tone.context.resume();
    // Tone.Transport.start();
    this.loop.start();
  }

  stop() {
    // Tone.Transport.stop();
    this.loop.stop();
    this.step = 0;
  }
}