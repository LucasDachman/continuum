import Tone from 'tone';
// import { notes } from '../redux/config-creators/compositionReducerConfig';
import { mapRatioToRange } from '../util/util'
import { clamp } from 'lodash';

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
    this.delay = new Tone.FeedbackDelay('8n', 0.5)

    // create sampler
    this.synth = new Tone.Players(this.urls)
      .chain(
        this.filter,
        this.delay,
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

  setDelay = ratio => {
    this.delay.feedback.value = mapRatioToRange(ratio, 0.2, 0.5);
    this.delay.wet.value = clamp(ratio - 0.2, 0, 1);
  }
}