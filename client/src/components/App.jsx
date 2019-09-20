import React, { useState, useEffect } from 'react';
import Synth1 from './Synth1/Synth1';
import CSynth from '../audio/CSynth';
import PianoRoll from './piano-roll/PianoRoll.jsx';
import { subscribeCSynth, subscribeSequencer } from '../redux/subscriptions'
import Tone from 'tone';
import startAudioContext from 'startaudiocontext';
import './App.css';
import { Provider } from 'react-redux';
import makeStore from '../redux/store';
import { createEmitter } from '../socket/socketEmitter';
import Sequencer from '../audio/Sequencer';

// setup web sockets to listen for and emit redux actions
const [actionEmitter, setupActionListener] = createEmitter();
const store = makeStore([actionEmitter]);
setupActionListener(store);

const tickTime = 170;
const frequencyOffsetValues = new Array(7).fill(null).map((_, i) => String(i - 3));

const synth = new CSynth();
subscribeCSynth(store, synth);

const { numSteps } = store.getState().synth1UI;
const sequencer = new Sequencer({ bpm: tickTime, numSteps })
sequencer.synth = synth;
subscribeSequencer(store, sequencer);

const App = () => {
  const [isPlaying, setPlaying] = useState(false);
  const [audioContextStarted, setAudioContextStarted] = useState(false);
  const [frequencyOffset, setFrequencyOffset] = useState('0');
  const [currentStep, setCurrentStep] = useState(0);

  const handlePlay = () => {
    Tone.context.resume();
    setPlaying(!isPlaying)
  }

  const handleClickFrequencyOffset = e => {
    sequencer.frequencyOffset = Number(e.currentTarget.value);
    setFrequencyOffset(e.currentTarget.value);
  }

  // runs once after first render
  useEffect(() => {
    // wait for audio context to start before rendering
    startAudioContext(Tone.context).then(() => {
      setAudioContextStarted(true);
    });

    // callback for sequencer
    sequencer.onTick = step => {
      setCurrentStep(step);
    }
  }, []);

  useEffect(() => {
    isPlaying ? sequencer.start() : sequencer.stop();
  }, [isPlaying])

  return !audioContextStarted ? 'Click' : (
    <Provider store={store}>
      <button id='play-button'
        onClick={handlePlay}
      >
        {isPlaying ? 'Stop' : 'Play'}
      </button>
      <Synth1 isPlaying={isPlaying} />
      <form id='frequency-offset'>
        <h3>Frequency Offset</h3>
        <div>
          {
            frequencyOffsetValues.map(value => {
              return <input type='radio'
                name='frequency-offset'
                value={value}
                key={value}
                checked={frequencyOffset === value}
                onChange={handleClickFrequencyOffset}
              />
            })
          }
        </div>
      </form>
      <PianoRoll currentStep={currentStep} />
    </Provider>
  );
}

export default App;