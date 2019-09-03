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

const frequencyOffsetValues = new Array(7).fill(null).map((_, i) => String(i - 3));

const App = () => {

  // const [val, setVal] = useState(null);
  const [audioContextStarted, setAudioContextStarted] = useState(false);
  const [frequencyOffset, setFrequencyOffset] = useState('0');

  const handleClickFrequencyOffset = e => {
    synth.current.frequencyOffset = Number(e.currentTarget.value);
    setFrequencyOffset(e.currentTarget.value);
  }

  // runs once after first render
  useEffect(() => {
    startAudioContext(Tone.context).then(() => {
      setAudioContextStarted(true);
    });
  }, []);

  const synth = useRef();

  // runs when audio context has started
  useEffect(() => {
    if (!audioContextStarted) return;
    synth.current = new CSynth(tickTime);
    const synthRef = synth.current;

    const sequencer = new Nexus.Sequencer('#sequencer', {
      rows: 24,
      columns: 16
    });
    sequencer.on('change', ({ row, column, state }) => {
      window.localStorage.setItem('chords', JSON.stringify(sequencer.matrix.pattern));
      const freq = mtof(lowNote - row + 24);
      if (state) {
        synthRef.addNote({ index: column, freq });
      } else {
        synthRef.removeNote({ index: column, freq });
      }
    });
    const localChords = window.localStorage.getItem('chords');
    if (localChords) {
      sequencer.matrix.set.all(JSON.parse(localChords));
    }
    synthRef.onTick = (pos) => {
      sequencer.stepper.value = pos;
      sequencer.next();
    }

    const playButton = new Nexus.Button('#play-button', { mode: 'toggle' });
    playButton.on('change', state => state ? synthRef.start() : synthRef.stop());

    // KNOBS
    // AMP
    const ampAttack = new Nexus.Dial('#amp-attack');
    synthRef.setAmpAttack(ampAttack.value);
    ampAttack.on('change', v => synthRef.setAmpAttack(v));

    const ampDecay = new Nexus.Dial('#amp-decay', { value: 0.5 });
    synthRef.setAmpDecay(ampDecay.value);
    ampDecay.on('change', v => synthRef.setAmpDecay(v));

    const ampSustain = new Nexus.Dial('#amp-sustain', { value: 1 });
    synthRef.setAmpSustain(ampSustain.value);
    ampSustain.on('change', v => synthRef.setAmpSustain(v));

    const ampRelease = new Nexus.Dial('#amp-release', { value: 0.2 });
    synthRef.setAmpRelease(ampRelease.value);
    ampRelease.on('change', v => synthRef.setAmpRelease(v));

    // Filter
    const filterAttack = new Nexus.Dial('#filter-attack');
    synthRef.setFilterAttack(filterAttack.value);
    filterAttack.on('change', v => synthRef.setFilterAttack(v));

    const filterDecay = new Nexus.Dial('#filter-decay', { value: 0.5 });
    synthRef.setFilterDecay(filterDecay.value);
    filterDecay.on('change', v => synthRef.setFilterDecay(v));

    const filterSustain = new Nexus.Dial('#filter-sustain', { value: 1 });
    synthRef.setFilterSustain(filterSustain.value);
    filterSustain.on('change', v => synthRef.setFilterSustain(v));

    const filterRelease = new Nexus.Dial('#filter-release', { value: 0.2 });
    synthRef.setFilterRelease(filterRelease.value);
    filterRelease.on('change', v => synthRef.setFilterRelease(v));

    const filterBase = new Nexus.Dial('#filter-base');
    synthRef.setFilterBase(filterBase.value);
    filterBase.on('change', v => synthRef.setFilterBase(v));

    const filterRange = new Nexus.Dial('#filter-range', { value: 0.5 });
    synthRef.setFilterRange(filterRange.value);
    filterRange.on('change', v => synthRef.setFilterRange(v));

    const filterQ = new Nexus.Dial('#filter-q');
    synthRef.setFilterQ(filterQ.value);
    filterQ.on('change', v => synthRef.setFilterQ(v));

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
      <div id='sequencer' />
    </div>
  );
}

export default App;
