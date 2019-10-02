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


const tickTime = 85;
const synth1 = new CSynth('synth1');
const bass = new BassSynthAudio('bass');
const lenny = new LennySynthAudio('lenny');
const drummer = new DrummerAudio('drummer');
export const sequencer = new Sequencer({ bpm: tickTime, numSteps })

sequencer.createSequence(synth1);
sequencer.createSequence(bass);
sequencer.createSequence(lenny);
sequencer.createSequence(drummer);

(async () => {

  // setup web sockets to listen for and emit redux actions
  // need to wait for initial state before creating the store
  const store = await makeStoreWithSocket();

  subscribeCSynth(store, synth1);
  subscribeBassSynth(store, bass);
  subscribeLennySynth(store, lenny);
  subscribeSequencer(store, sequencer);
  subscribeDrummer(store, drummer);

  ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById('root'));

})();