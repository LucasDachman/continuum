import Tone from 'tone';
// import { notes } from '../redux/config-creators/compositionReducerConfig';
import {mapRatioToRange} from '../util/util'

export default class DrummerAudio {
  constructor(name, files) {
    this.name = name;
    // set up audio files
    this.urls = files.reduce((acc, file) => {
      acc[file.index] = file.path
      return acc;
    }, {})
      // setup effects
    this.filter = new Tone.Filter();

    // create sampler
    this.synth = new Tone.Players(this.urls)
    .chain(
      this.filter,
      new Tone.Volume(-8),
      new Tone.Limiter(),
      Tone.Master
    );
  }

  triggerAttackRelease = (notes, length, time) => {
    // this.synth.triggerAttackRelease(notes, length, time);
    notes.forEach(note => {
      if (!this.urls[note]) return;
      this.synth.get(note).restart(time);
      this.synth.get(note).start(time);
    });
  }

  setFilterFreq = ratio => {
    // this.filter
    this.filter.frequency.value = mapRatioToRange(Math.pow(ratio, 2), 0, 10000);
  }
}