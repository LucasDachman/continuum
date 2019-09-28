import Tone from 'tone';
import { notes } from '../redux/config-creators/compositionReducerConfig';

const kicksContext = require.context('../audio-files/kicks/', true, /01\.wav$/);
const snaresContext = require.context('../audio-files/snares', true, /01\.wav$/);
const rimsContext = require.context('../audio-files/rims', true, /01\.wav$/);
const shakerSnapsContext = require.context('../audio-files/shaker_snaps', true, /01\.wav$/);
const clapsContext = require.context('../audio-files/claps', true, /01\.wav$/);
const shortCymbalsContext = require.context('../audio-files/short_cymbals', true, /01\.wav$/);
const longCymbalsContext = require.context('../audio-files/long_cymbals', true, /01\.wav$/);

let files = {
  kicks: kicksContext,
  snares: snaresContext,
  rims: rimsContext,
  shakersSnaps: shakerSnapsContext,
  claps: clapsContext,
  shortCymbals: shortCymbalsContext,
  longCymbals: longCymbalsContext
};


for (let [key, context] of Object.entries(files)) {
  files[key] = context.keys().map(k => {
    const file = context(k)
    const name = file.match(/\w*_\d\d(?=\.)/)[0] || 'default';
    return { file, name };
  });
}

export { files as audioFiles }

export default class DrummerAudio {
  constructor(name) {
    this.name = name;
    let count = 0;
    this.urls = Object.values(files).reduce((acc, folder) => {
      acc[notes[count++].frequency] = folder[0].file
      return acc
    }, {});
    this.synth = new Tone.Players(this.urls).toMaster();
    console.log(this.urls)
  }

  triggerAttackRelease = (notes, length, time) => {
    notes.forEach(note => {
      if (!this.urls[note]) return;
      this.synth.get(note).restart(time);
      this.synth.get(note).start(time);
    });
  }
}