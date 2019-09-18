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
  subscribe(store, 'synth1UI.amp.attack', synth.setAmpAttack);
  subscribe(store, 'synth1UI.amp.decay', synth.setAmpDecay);
  subscribe(store, 'synth1UI.amp.sustain', synth.setAmpSustain);
  subscribe(store, 'synth1UI.amp.release', synth.setAmpRelease);

  subscribe(store, 'synth1UI.filter.attack', synth.setFilterAttack);
  subscribe(store, 'synth1UI.filter.decay', synth.setFilterDecay);
  subscribe(store, 'synth1UI.filter.sustain', synth.setFilterSustain);
  subscribe(store, 'synth1UI.filter.release', synth.setFilterRelease);
  subscribe(store, 'synth1UI.filter.base', synth.setFilterBase);
  subscribe(store, 'synth1UI.filter.range', synth.setFilterRange);
  subscribe(store, 'synth1UI.filter.q', synth.setFilterQ);

  const { composition } = store.getState().synth1UI;
  for (const [rowi, row] of composition.entries()) {
    for (const [coli, cell] of row.entries()) {
      const path = String.raw`synth1UI.composition.${rowi}.${coli}.active`;
      subscribe(store, path, active => {
        console.log(`${cell.note.name} changed to ${active}`)
        if (active) {
          synth.addNote({index: coli, freq: cell.note.frequency});
        } else {
          synth.removeNote({index: coli, freq: cell.note.frequency});
        }
      });
    }
  }
}