import React, { useState, useEffect, useCallback } from 'react';
import BassSynth from '../BassSynth/BassSynth.jsx';
import PianoRoll from './piano-roll/PianoRoll.jsx';
import './App.css';
import { octaveNotes } from '../util/notes-util';
import { sequencer } from '../index';
import { connect } from 'react-redux';
import DrumSequencer from './piano-roll/DrumSequencer.jsx';
import LennySynth from '../LennySynth/LennySynth';
import Drummer from '../Drummer/Drummer';

const mapStateToProps = state => ({
  numActive: state.util.numActive,
  maxReached: state.util.maxReached,
});

const App = ({ numActive, maxReached }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tonic, setTonic] = useState(octaveNotes[0]);
  const [scale, setScale] = useState('major');

  const handleTonicChange = useCallback(e => {
    setTonic(e.target.value);
  }, [setTonic]);

  const handleScaleChange = useCallback(e => {
    setScale(e.target.value);
  }, [setScale]);

  // runs once after first render
  useEffect(() => {
    // callback for sequencer
    sequencer.onTick = step => {
      setCurrentStep(step);
    }
  }, []);

  return (
    <main>
      <section id='control-panel'>
        <h1>Continuum</h1>
        <select value={tonic} onChange={handleTonicChange}>
          {
            octaveNotes.map(note => <option key={note} value={note}>{note}</option>)
          }
        </select>
        <select value={scale} onChange={handleScaleChange}>
          <option value='Major'>Major</option>
          <option value='Minor'>Minor</option>
        </select>
        <h1 id='num-active'>{maxReached ? 'MAX' : numActive}</h1>
      </section>
      <BassSynth />
      <LennySynth />
      <Drummer />
      <section id='sequencer'>
        <PianoRoll currentStep={currentStep} />
        <DrumSequencer currentStep={currentStep} />
      </section>
    </main>
  );
}

export default connect(
  mapStateToProps,
  null,
)(App);