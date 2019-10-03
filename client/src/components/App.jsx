import React, { useState, useEffect, useCallback } from 'react';
import Synth1 from './Synth1/Synth1';
import BassSynth from '../BassSynth/BassSynth.jsx';
import PianoRoll from './piano-roll/PianoRoll.jsx';
import Tone from 'tone';
import startAudioContext from 'startaudiocontext';
import './App.css';
import { octaveNotes } from '../util/notes-util';
import { sequencer } from '../index';
import { connect } from 'react-redux';
import DrumSequencer from './piano-roll/DrumSequencer.jsx';
import LennySynth from '../LennySynth/LennySynth';
import Drummer from '../Drummer/Drummer';

const mapStateToProps = state => ({
  character: state.character.character
});

const App = ({ character }) => {
  const [isPlaying, setPlaying] = useState(false);
  const [audioContextStarted, setAudioContextStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [tonic, setTonic] = useState(octaveNotes[0]);
  const [scale, setScale] = useState('major');

  const handlePlay = () => {
    Tone.context.resume();
    setPlaying(!isPlaying)
  }

  const handleTonicChange = useCallback(e => {
    setTonic(e.target.value);
  }, [setTonic]);

  const handleScaleChange = useCallback(e => {
    setScale(e.target.value);
  }, [setScale]);

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
      <section id='control-panel'>
        <p>You are: {character}</p>
        <button id='play-button'
          onClick={handlePlay}
        >
          {isPlaying ? 'Stop' : 'Play'}
        </button>
        <select value={tonic} onChange={handleTonicChange}>
          {
            octaveNotes.map(note => <option key={note} value={note}>{note}</option>)
          }
        </select>
        <select value={scale} onChange={handleScaleChange}>
          <option value='Major'>Major</option>
          <option value='Minor'>Minor</option>
        </select>
      </section>
      <Synth1 />
      <BassSynth />
      <LennySynth />
      <Drummer />
      <section id='sequencer'>
        <PianoRoll currentStep={currentStep} />
        <DrumSequencer />
      </section>
    </main>
  );
}

export default connect(
  mapStateToProps,
  null,
)(App);