import React, { useState, useEffect, useRef } from 'react';
import startAudioContext from 'startaudiocontext';
import Tone from 'tone';
import CSynth from '../audio/CSynth';
import './App.css';

const Nexus = window.Nexus;
const { mtof } = Nexus;

const lowNote = 36;
const highNote = 72;
const tickTime = 170;

const App = () => {

  const [val, setVal] = useState(null);
  const [audioContextStarted, setAudioContextStarted] = useState(false);

  // runs once after first render
  useEffect(() => {
    startAudioContext(Tone.context).then(() => {
      setAudioContextStarted(true);
    });
  }, []);

  // runs when audio context has started
  useEffect(() => {
    if (!audioContextStarted) return;
    const synth = new CSynth(tickTime);

    // const piano = new Nexus.Piano('#piano', { lowNote, highNote });
    // piano.on('change', ({ note, state }) => {
    //   if (state === true)
    //     synth.triggerAttack(mtof(note));
    //   else
    //     synth.triggerRelease(mtof(note));
    // });

    const sequencer = new Nexus.Sequencer('#sequencer', {
      rows: 12,
      columns: 16
    });
    sequencer.on('change', ({ row, column: index, state }) => {
      const freq = mtof(lowNote - row + 24);
      if (state) {
        synth.addNote({ index, freq });
      } else {
        synth.removeNote({ index, freq });
      }
    });
    synth.onTick = (pos) => {
      sequencer.stepper.value = pos;
      sequencer.next();
    }

    const playButton = new Nexus.Button('#play-button', { mode: 'toggle' });
    playButton.on('change', state => state ? synth.start() : synth.stop());

    // KNOBS
    const ampAttack = new Nexus.Dial('#amp-attack');
    ampAttack.on('change', v => synth.setAmpAttack(v));

    const ampDecay = new Nexus.Dial('#amp-decay');
    ampDecay.on('change', v => synth.setAmpDecay(v));

    const ampSustain = new Nexus.Dial('#amp-sustain');
    ampSustain.on('change', v => synth.setAmpSustain(v));

    const ampRelease = new Nexus.Dial('#amp-release');
    ampRelease.on('change', v => synth.setAmpRelease(v));

  }, [audioContextStarted]);

  // actual render code

  return !audioContextStarted ? 'Click' : (
    <div className='App'>
      <section id='amp-env'>
        <div id='amp-attack'></div>
        <div id='amp-decay'></div>
        <div id='amp-sustain'></div>
        <div id='amp-release'></div>
      </section>
      {/* <section id='filter-env'>
        <div id='filter-attack'></div>
        <div id='filter-decay'></div>
        <div id='filter-sustain'></div>
        <div id='filter-release'></div>
        <div id='filter-min'></div>
        <div id='filter-max'></div>
        <div id='filter-q'></div>
      </section> */}
      {/* <div id='piano'></div> */}
      <div id='play-button'></div>
      <div id='sequencer'></div>
    </div>
  );
}

export default App;
