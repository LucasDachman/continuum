import React, { useState, useEffect } from 'react';
import Synth1 from './Synth1/Synth1';
import PianoRoll from './piano-roll/PianoRoll.jsx';
import Tone from 'tone';
import startAudioContext from 'startaudiocontext';
import './App.css';
import { sequencer } from '../index'

const App = () => {
  const [isPlaying, setPlaying] = useState(false);
  const [audioContextStarted, setAudioContextStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handlePlay = () => {
    Tone.context.resume();
    setPlaying(!isPlaying)
  }

  // runs once after first render
  useEffect(() => {
    // wait for audio context to start before rendering
    startAudioContext(Tone.context).then(() => {
      setAudioContextStarted(true);
    });

    // callback for sequencer1
    sequencer.onTick = step => {
      setCurrentStep(step);
    }
  }, []);

  useEffect(() => {
    isPlaying ? sequencer.start() : sequencer.stop();
  }, [isPlaying])

  return !audioContextStarted ? 'Click' : (
    <main>
      <button id='play-button'
        onClick={handlePlay}
      >
        {isPlaying ? 'Stop' : 'Play'}
      </button>
      <Synth1 isPlaying={isPlaying} />
      <PianoRoll currentStep={currentStep} />
    </main>
  );
}

export default App;