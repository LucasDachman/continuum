import React, { useState, useEffect } from 'react';
import Synth1 from './Synth1/Synth1';
import Tone from 'tone';
import startAudioContext from 'startaudiocontext';
import './App.css';

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
    <>
      <button id='play-button'
        onClick={() => setPlaying(!isPlaying)}
      >
        {isPlaying ? 'Stop' : 'Play'}
      </button>
      <Synth1 isPlaying={isPlaying} />
    </>
  );
}

export default App;