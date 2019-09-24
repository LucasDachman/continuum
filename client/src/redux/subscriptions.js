// import store from './store';
import watch from 'redux-watch';
import { get } from 'object-path';

// use redux-watch to subscribe to a certain store value
// and use the callback to set the initial value
const subscribe = (store, path, callback) => {
  store.subscribe(watch(store.getState, path)(callback));
  callback(get(store.getState(), path));
}

export function subscribeCSynth(store, synth) {
  const synthName = synth.name;
  subscribe(store, `${synthName}.amp.attack`, synth.setAmpAttack);
  subscribe(store, `${synthName}.amp.decay`, synth.setAmpDecay);
  subscribe(store, `${synthName}.amp.sustain`, synth.setAmpSustain);
  subscribe(store, `${synthName}.amp.release`, synth.setAmpRelease);

  subscribe(store, `${synthName}.filter.attack`, synth.setFilterAttack);
  subscribe(store, `${synthName}.filter.decay`, synth.setFilterDecay);
  subscribe(store, `${synthName}.filter.sustain`, synth.setFilterSustain);
  subscribe(store, `${synthName}.filter.release`, synth.setFilterRelease);
  subscribe(store, `${synthName}.filter.base`, synth.setFilterBase);
  subscribe(store, `${synthName}.filter.range`, synth.setFilterRange);
  subscribe(store, `${synthName}.filter.q`, synth.setFilterQ);
}

export function subscribeBassSynth(store, synth) {
  const synthName = synth.name;
  subscribe(store, `${synthName}.length`, synth.setLength)
  subscribe(store, `${synthName}.shape`, synth.setShape);
  subscribe(store, `${synthName}.filter.decay`, synth.setFilterDecay);
  subscribe(store, `${synthName}.filter.range`, synth.setFilterRange);
  subscribe(store, `${synthName}.filter.q`, synth.setFilterQ);
}

export function subscribeSequencer(store, sequencer) {
  // subscribe each sequence to it's corresponding composition in the redux store
  for (const [synthName, sequence] of Object.entries(sequencer.sequences)) {
    const { composition } = store.getState()[synthName];
    // subscribe to each cell in the matrix
    for (const [rowi, row] of composition.entries()) {
      for (const [coli, cell] of row.entries()) {
        const path = String.raw`${synthName}.composition.${rowi}.${coli}.active`;
        subscribe(store, path, active => {
          if (active) {
            sequence.addNote({ index: coli, freq: cell.note.frequency });
          } else {
            sequence.removeNote({ index: coli, freq: cell.note.frequency });
          }
        });
      }
    }
  }
}