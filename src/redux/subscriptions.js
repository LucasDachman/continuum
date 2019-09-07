import store from '../redux/store';
import watch from 'redux-watch';
import {get} from 'lodash';

// use redux-watch to subscribe to a certain store value
// and use the callback to set the initial value
const subscribe = (path, callback) => {
  store.subscribe(watch(store.getState, path)(callback));
  callback(get(store.getState(), path));
}

export function subscribeCSynth(synth) {
  subscribe('synth1UI.amp.attack', synth.setAmpAttack);
  subscribe('synth1UI.amp.decay', synth.setAmpDecay);
  subscribe('synth1UI.amp.sustain', synth.setAmpSustain);
  subscribe('synth1UI.amp.release', synth.setAmpRelease);

  subscribe('synth1UI.filter.attack', synth.setFilterAttack);
  subscribe('synth1UI.filter.decay', synth.setFilterDecay);
  subscribe('synth1UI.filter.sustain', synth.setFilterSustain);
  subscribe('synth1UI.filter.release', synth.setFilterRelease);
  subscribe('synth1UI.filter.base', synth.setFilterBase);
  subscribe('synth1UI.filter.range', synth.setFilterRange);
  subscribe('synth1UI.filter.q', synth.setFilterQ);

}