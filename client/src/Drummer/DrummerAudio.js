import Tone from 'tone';
import { notes } from '../redux/config-creators/compositionReducerConfig';

function importAll(r) {
  return r.keys().map(k => r(k));
}

const audioFiles = importAll(require.context('../audio-files/', true, /\.wav$/));

export default class DrummerAudio {
  constructor(name) {
    this.name = name;
    this.urls = audioFiles.reduce((acc, curr, i) => {
      // curr.match(/slices_[0-9]+(?=\.)/)
      // set note name as key to file path
      acc[notes[i].frequency] = curr;
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