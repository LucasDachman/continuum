import React, { useState, useEffect, useRef } from 'react';
import startAudioContext from 'startaudiocontext';
import Tone from 'tone';
import CSynth from '../audio/CSynth';
import './App.css';

const Nexus = window.Nexus;
const { mtof } = Nexus;

const lowNote = 24;
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

    const sequencer = new Nexus.Sequencer('#sequencer', {
      rows: 24,
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
    // AMP
    const ampAttack = new Nexus.Dial('#amp-attack');
    ampAttack.on('change', v => synth.setAmpAttack(v));

    const ampDecay = new Nexus.Dial('#amp-decay', { value: 0.5 });
    ampDecay.on('change', v => synth.setAmpDecay(v));

    const ampSustain = new Nexus.Dial('#amp-sustain', { value: 1 });
    ampSustain.on('change', v => synth.setAmpSustain(v));

    const ampRelease = new Nexus.Dial('#amp-release');
    ampRelease.on('change', v => synth.setAmpRelease(v));

    // Filter
    const filterAttack = new Nexus.Dial('#filter-attack');
    filterAttack.on('change', v => synth.setFilterAttack(v));

    const filterDecay = new Nexus.Dial('#filter-decay', { value: 0.5 });
    filterDecay.on('change', v => synth.setFilterDecay(v));

    const filterSustain = new Nexus.Dial('#filter-sustain', { value: 1 });
    filterSustain.on('change', v => synth.setFilterSustain(v));

    const filterRelease = new Nexus.Dial('#filter-release');
    filterRelease.on('change', v => synth.setFilterRelease(v));

    const filterBase = new Nexus.Dial('#filter-base');
    filterBase.on('change', v => synth.setFilterBase(v));

    const filterRange = new Nexus.Dial('#filter-range');
    filterRange.on('change', v => synth.setFilterRange(v));

    const filterQ = new Nexus.Dial('#filter-q');
    filterQ.on('change', v => synth.setFilterQ(v));

  }, [audioContextStarted]);

  // actual render code

  return !audioContextStarted ? 'Click' : (
    <div className='App'>
      <section id='amp-env'>
        <h2>Amp Env</h2>
        <div className='knob-row'>
          <div className='knob'><div id='amp-attack' />Attack</div>
          <div className='knob' ><div id='amp-decay' />Decay</div>
          <div className='knob' ><div id='amp-sustain' />Sustain</div>
          <div className='knob' ><div id='amp-release' />Release</div>
        </div>
      </section>
      <section id='filter-env'>
        <h2>Filter</h2>
        <div className='knob-row'>
          <div className='knob'>
            <div id='filter-attack' />
            Attack
          </div>
          <div className='knob'>
            <div id='filter-decay' />
            Decay
          </div>
          <div className='knob'>
            <div id='filter-sustain' />
            Sustain
          </div>
          <div className='knob'>
            <div id='filter-release' />
            Release
          </div>
          <div className='knob'>
            <div id='filter-base' />
            Base
          </div>
          <div className='knob'>
            <div id='filter-range' />
            Range
          </div>
          <div className='knob'>
            <div id='filter-q' />
            Q
          </div>
        </div>
      </section>
      <div id='play-button'></div>
      <div id='sequencer' />
    </div>
  );
}

export default App;
