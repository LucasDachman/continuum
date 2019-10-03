import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import CSynth from './audio/CSynth';
import BassSynthAudio from './BassSynth/BassSynthAudio';
import { 
  subscribeCSynth, 
  subscribeBassSynth, 
  subscribeSequencer,
  subscribeLennySynth,
  subscribeDrummer
} from './redux/subscriptions'
import { numSteps } from './redux/config-creators/compositionReducerConfig';
import { makeStoreWithSocket } from './socket/configureSocket';
import Sequencer from './audio/Sequencer';
import LennySynthAudio from './LennySynth/LennySynthAudio';
import DrummerAudio from './Drummer/DrummerAudio';


export const sequencer = new Sequencer({ bpm: 85, numSteps });

(async () => {


  // setup web sockets to listen for and emit redux actions
  // need to wait for initial state before creating the store
  const store = await makeStoreWithSocket();

  const synth1 = new CSynth('synth1');
  const bass = new BassSynthAudio('bass');
  const lenny = new LennySynthAudio('lenny');
  const drummer = new DrummerAudio('drummer', store.getState().drummer.files);

  sequencer.createSequence(synth1);
  sequencer.createSequence(bass);
  sequencer.createSequence(lenny);
  sequencer.createSequence(drummer);

  subscribeCSynth(store, synth1);
  subscribeBassSynth(store, bass);
  subscribeLennySynth(store, lenny);
  subscribeDrummer(store, drummer);

  subscribeSequencer(store, sequencer);

  ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById('root'));

})();