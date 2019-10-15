import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Tone from 'tone';
import { Provider } from 'react-redux';
import startAudioContext from 'startaudiocontext';
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
import { setNextInterval } from './redux/reducers/utilReducer';
import { makeStoreWithSocket } from './socket/configureSocket';
import Sequencer from './audio/Sequencer';
import LennySynthAudio from './LennySynth/LennySynthAudio';
import DrummerAudio from './Drummer/DrummerAudio';


const bpm = 85;
export const sequencer = new Sequencer({ bpm, numSteps });
const oneMinute = 60000
const oneBeat = oneMinute / bpm
const intervalTime = oneBeat * numSteps;

(async () => {

  // setup web sockets to listen for and emit redux actions
  // need to wait for initial state before creating the store
  const store = await makeStoreWithSocket();

  sequencer.onLoop = time => {
    store.dispatch(setNextInterval(time + intervalTime));
  }

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

  // click needed to start audio context
  document.getElementById('start-message').innerHTML = "Please Click To Continue"

  // wait for audio context to start before rendering
  await startAudioContext(Tone.context);

  // find next interval to start at
  const { nextInterval } = store.getState().util;
  console.log(nextInterval)
  if (nextInterval === 0) {
    sequencer.start();
  } else {
    setTimeout(() => {
      sequencer.start();
    }, store.getState().util.nextInterval - Date.now())
  }

  // sequencer.start();

  ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById('root'));

})();