import React, { useState, useEffect } from 'react';
import CSynth from '../audio/CSynth';
import './App.css';

const Nexus = window.Nexus;
const { mtof } = Nexus;

const lowNote = 36;
const highNote = 72;

const App = () => {

  const [val, setVal] = useState(null);

  // MUI elements
  useEffect(() => {
    const synth = new CSynth();

    const dial = new Nexus.Dial('#dial');
    dial.on('change', v => setVal(v));

    const piano = new Nexus.Piano('#piano', { lowNote, highNote });
    piano.on('change', ({ note, state }) => {
      if (state === true)
        synth.triggerAttack(mtof(note));
      else
        synth.triggerRelease(mtof(note));
    });

    const sequencer = new Nexus.Sequencer('#sequencer', {
      rows: 12,
      columns: 16
    });
    sequencer.on('step', (noteVals) => {
      const noteOns = noteVals.map((v, i) => v ? mtof(lowNote + i) : null).filter(v => v);
      const noteOffs = noteVals.map((v, i) => v ? null : mtof(lowNote + i)).filter(v => v);
      noteOns.length > 0 && synth.triggerAttack(noteOns);
      noteOffs.length > 0 && synth.triggerRelease(noteOffs);
    });

    const playButton = new Nexus.Button('#play-button', { mode: 'toggle' });
    playButton.on('change', state => {
      if (state) {
        sequencer.start(170);
        synth.start();
      }
      else {
        sequencer.stepper.value = 0;
        sequencer.stop();
        synth.stop();
      }
    });
  }, []);

  return (
    <div className='App'>
      <div id='dial'></div>
      <div id='piano'></div>
      <div id='play-button'></div>
      <div id='sequencer'></div>
    </div>
  );
}

export default App;
