import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import CSynth from './audio/CSynth';
import { subscribeCSynth, subscribeSequencer } from './redux/subscriptions'
import { numSteps } from './redux/config-creators/compositionReducerConfig';
import { makeStoreWithSocket } from './socket/configureSocket';
import Sequencer from './audio/Sequencer';


const tickTime = 170;
const synth1 = new CSynth('synth1');
const synth2 = new CSynth('synth2');
export const sequencer = new Sequencer({ bpm: tickTime, numSteps })

sequencer.createSequence(synth1);
sequencer.createSequence(synth2);
sequencer.sequences.synth2.frequencyOffset = 12;

(async () => {

  // setup web sockets to listen for and emit redux actions
  // need to wait for initial state before creating the store
  const store = await makeStoreWithSocket();

  subscribeCSynth(store, synth1);
  subscribeCSynth(store, synth2);
  subscribeSequencer(store, sequencer);

  ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById('root'));

})();