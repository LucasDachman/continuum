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
  amp: state.synth1UI.amp,
  filter: state.synth1UI.filter,
});

const useSetCallback = (set, attr) => {
  return useCallback(v => set({ [attr]: v }), [set, attr]);
}

const Synth1 = ({ isPlaying, setAmp, setFilter, amp, filter }) => {

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
  }, []);

  // actual render code

  console.log(useSetCallback(setAmp, 'attack'));
  return (
    <div className='App'>
      <section id='amp-env'>
        <h2>Amp Env</h2>
        <div className='knob-row'>
          <div className='knob'>
            <Dial value={amp.attack}
              onChange={useSetCallback(setAmp, 'attack')} />
            Attack
          </div>
          <div className='knob' >
            <Dial value={amp.decay}
              onChange={useSetCallback(setAmp, 'decay')} />
            Decay
          </div>
          <div className='knob' >
            <Dial value={amp.sustain}
              onChange={useSetCallback(setAmp, 'sustain')} />
            Sustain
          </div>
          <div className='knob' >
            <Dial value={amp.release}
              onChange={useSetCallback(setAmp, 'release')} />
            Release
          </div>
        </div>
      </section>
      <section id='filter-env'>
        <h2>Filter</h2>
        <div className='knob-row'>
          <div className='knob'>
            <Dial value={filter.attack}
              onChange={useSetCallback(setFilter, 'attack')} />
            Attack
          </div>
          <div className='knob'>
            <Dial value={filter.decay}
              onChange={useSetCallback(setFilter, 'decay')} />
            Decay
          </div>
          <div className='knob'>
            <Dial value={filter.sustain}
              onChange={useSetCallback(setFilter, 'sustain')} />
            Sustain
          </div>
          <div className='knob'>
            <Dial value={filter.release}
              onChange={useSetCallback(setFilter, 'release')} />
            Release
          </div>
          <div className='knob'>
            <Dial value={filter.base}
              onChange={useSetCallback(setFilter, 'base')} />
            Base
          </div>
          <div className='knob'>
            <Dial value={filter.range}
              onChange={useSetCallback(setFilter, 'range')} />
            Range
          </div>
          <div className='knob'>
            <Dial value={filter.q}
              onChange={useSetCallback(setFilter, 'q')} />
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
  mapStateToProps,
  mapDispatch
)(Synth1);
