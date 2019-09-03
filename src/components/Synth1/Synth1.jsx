import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import CSynth from '../../audio/CSynth';
import { subscribeCSynth } from '../../redux/subscriptions';
import { setAmp, setFilter } from '../../redux/reducers/synth1UIReducer';
import Dial from '../util/Dial';

const Nexus = window.Nexus;
const { mtof } = Nexus;

const lowNote = 24;
const highNote = 72;
const tickTime = 170;

const frequencyOffsetValues = new Array(7).fill(null).map((_, i) => String(i - 3));

const mapDispatch = {
  setAmp,
  setFilter
};

const mapStateToProps = state => ({
  ampAttack: state.synth1UI.amp.attack
});

const Synth1 = ({ isPlaying, setAmp, setFilter, ampAttack }) => {

  // const [val, setVal] = useState(null);
  const [frequencyOffset, setFrequencyOffset] = useState('0');

  const handleClickFrequencyOffset = e => {
    synth.current.frequencyOffset = Number(e.currentTarget.value);
    setFrequencyOffset(e.currentTarget.value);
  }

  const synth = useRef();

  useEffect(() => {
    if (!synth.current) return;
    isPlaying ? synth.current.start() : synth.current.stop();
  }, [isPlaying, synth])


  // runs when audio context has started
  useEffect(() => {
    // if (!audioContextStarted) return;
    synth.current = new CSynth(tickTime);
    const synthRef = synth.current;
    subscribeCSynth(synthRef);

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


    // KNOBS
    // AMP
    const ampAttack = new Nexus.Dial('#amp-attack');
    setAmp({ attack: ampAttack.value });
    ampAttack.on('change', v => setAmp({ attack: v }));

    const ampDecay = new Nexus.Dial('#amp-decay', { value: 0.5 });
    setAmp({ decay: ampDecay.value });
    ampDecay.on('change', v => setAmp({ decay: v }));

    const ampSustain = new Nexus.Dial('#amp-sustain', { value: 1 });
    setAmp({ sustain: ampSustain.value });
    ampSustain.on('change', v => setAmp({ sustain: v }));

    const ampRelease = new Nexus.Dial('#amp-release', { value: 0.2 });
    setAmp({ release: ampRelease.value });
    ampRelease.on('change', v => setAmp({ release: v }));

    // Filter
    const filterAttack = new Nexus.Dial('#filter-attack');
    setFilter({ attack: filterAttack.value });
    filterAttack.on('change', v => setFilter({ attack: v }));

    const filterDecay = new Nexus.Dial('#filter-decay', { value: 0.5 });
    setFilter({ decay: filterDecay.value });
    filterDecay.on('change', v => setFilter({ decay: v }));

    const filterSustain = new Nexus.Dial('#filter-sustain', { value: 1 });
    setFilter({ sustain: filterSustain.value });
    filterSustain.on('change', v => setFilter({ sustain: v }));

    const filterRelease = new Nexus.Dial('#filter-release', { value: 0.2 });
    setFilter({ release: filterRelease.value });
    filterRelease.on('change', v => setFilter({ release: v }));

    const filterBase = new Nexus.Dial('#filter-base');
    setFilter({ base: filterBase.value });
    filterBase.on('change', v => setFilter({ base: v }));

    const filterRange = new Nexus.Dial('#filter-range', { value: 0.5 });
    setFilter({ range: filterRange.value });
    filterRange.on('change', v => setFilter({ range: v }));

    const filterQ = new Nexus.Dial('#filter-q');
    setFilter({ q: filterQ.value });
    filterQ.on('change', v => setFilter({ q: v }));

  }, [setAmp, setFilter]);

  // actual render code

  return (
    <div className='App'>
      <section id='amp-env'>
        <h2>Amp Env</h2>
        <div className='knob-row'>
          {/* <Dial value={ampAttack} onChange={useCallback(v => setAmp({ attack: v }), [setAmp])} /> */}
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
      {/* <Dial value={1} onChange={v => console.log(v)} /> */}
    </div>
  );
}

export default connect(
  null,
  mapDispatch
)(Synth1);
