import React, { useState, useEffect } from 'react';
import CSynth from '../audio/CSynth';
import './App.css';

const Nexus = window.Nexus;
const { mtof } = Nexus;

const App = () => {

  const [val, setVal] = useState(null);

  // MUI elements
  useEffect(() => {
    const synth = new CSynth();

    const dial = new Nexus.Dial('#dial');
    dial.on('change', v => setVal(v));

    const piano = new Nexus.Piano('#piano', {
      lowNote: 36,
      highNote: 72,
    });
    piano.on('change', ({ note, state }) => {
      if(state === true)
        synth.triggerAttack(mtof(note));
      else
        synth.triggerRelease(mtof(note));
    });
  }, []);

  return (
    <div className='App'>
      <header>Hello, world</header>
      <div id='dial'></div>
      <div id='piano'></div>
    </div>
  );
}

export default App;
