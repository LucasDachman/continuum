import React, { useState, useEffect } from 'react';
import Synth1 from './Synth1/Synth1';
import Tone from 'tone';
import startAudioContext from 'startaudiocontext';
import './App.css';
import { Provider } from 'react-redux';
import makeStore from 'continuum-shared/redux/store';
import { createLogger } from 'redux-logger';
import { createEmitter } from '../socket/socketEmitter';

const logger = createLogger({
  collapsed: true
});
const [emitter, setupListener] = createEmitter();
const store = makeStore([emitter, logger]);
setupListener(store);

const App = () => {
  const [isPlaying, setPlaying] = useState(false);
  const [audioContextStarted, setAudioContextStarted] = useState(false);

  // runs once after first render
  useEffect(() => {
    startAudioContext(Tone.context).then(() => {
      setAudioContextStarted(true);
    });
  }, []);

  return !audioContextStarted ? 'Click' : (
    <Provider store={store}>
      <button id='play-button'
        onClick={() => setPlaying(!isPlaying)}
      >
        {isPlaying ? 'Stop' : 'Play'}
      </button>
      <Synth1 isPlaying={isPlaying} />
    </Provider>
  );
}

export default App;