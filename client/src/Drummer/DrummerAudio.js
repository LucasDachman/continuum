import Tone from 'tone';
import { notes } from '../redux/config-creators/compositionReducerConfig';

function importAll(r) {
  return r.keys().map(k => r(k));
}

const kicksContext = require.context('../audio-files/kicks/', true, /01\.wav$/);
const snaresContext = require.context('../audio-files/snares', true, /01\.wav$/);
const rimsContext = require.context('../audio-files/rims', true, /01\.wav$/);
const shakerSnapsContext = require.context('../audio-files/shaker_snaps', true, /01\.wav$/);
const clapsContext = require.context('../audio-files/claps', true, /01\.wav$/);
const shortCymbalsContext = require.context('../audio-files/short_cymbals', true, /01\.wav$/);
const longCymbalsContext = require.context('../audio-files/long_cymbals', true, /01\.wav$/);

const files = {
  kicks: kicksContext,
  snares: snaresContext,
  rims: rimsContext,
  shakersSnaps: shakerSnapsContext,
  claps: clapsContext,
  shortCymbals: shortCymbalsContext,
  longCymbals: longCymbalsContext
};

for (let [key, context] of Object.entries(files)) {
  files[key] = importAll(context);
}
console.log(files)

export const audioFiles = [];

export default class DrummerAudio {
  constructor(name) {
    this.name = name;
    this.urls = audioFiles.reduce((acc, curr, i) => {
      // acc[notes[i].frequency] = curr;
      return acc;
    }, {})
    this.synth = new Tone.Players(this.urls).toMaster();
  }

  triggerAttackRelease = (notes, length, time) => {
    notes.forEach(note => {
      if (!this.urls[note]) return;
      this.synth.get(note).restart(time);
      this.synth.get(note).start(time);
    });
  }
}