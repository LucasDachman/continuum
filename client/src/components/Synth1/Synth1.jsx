import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect, useStore } from 'react-redux';
import CSynth from '../../audio/CSynth';
import { subscribeCSynth } from '../../redux/subscriptions';
import { setAmp, setFilter }from '../../redux/reducers/synth1UIReducer';
import Dial from '../util/Dial';
import PianoRoll from '../piano-roll/PianoRoll';

const tickTime = 170;

const frequencyOffsetValues = new Array(7).fill(null).map((_, i) => String(i - 3));

const mapDispatch = {
  setAmp,
  setFilter,
};

const mapStateToProps = state => ({
  amp: state.synth1UI.amp,
  filter: state.synth1UI.filter,
  numSteps: state.synth1UI.numSteps,
});

const useSetCallback = (set, attr) => {
  return useCallback(v => set({ [attr]: v }), [set, attr]);
}

const Synth1 = ({ isPlaying, setAmp, setFilter, amp, filter, numSteps }) => {

  const store = useStore();

  const [frequencyOffset, setFrequencyOffset] = useState('0');
  const [currentStep, setCurrentStep] = useState(0);

  const synth = useRef(new CSynth({bpm: tickTime, numSteps}));

  // runs once on first render
  useEffect(() => {
    subscribeCSynth(store, synth.current);
    synth.current.onTick = step => {
      setCurrentStep(step);
    }
  }, [store]);

  useEffect(() => {
    if (!synth.current) return;
    isPlaying ? synth.current.start() : synth.current.stop();
  }, [isPlaying, synth])

  const handleClickFrequencyOffset = e => {
    synth.current.frequencyOffset = Number(e.currentTarget.value);
    setFrequencyOffset(e.currentTarget.value);
  }

  // actual render code
  return (
    <div className='App'>
      <section id='amp-env'>
        <h2>Amp Env</h2>
        <div className='knob-row'>
          <Dial
            value={amp.attack}
            onChange={useSetCallback(setAmp, 'attack')} >
            Attack
          </Dial>
          <Dial
            value={amp.decay}
            onChange={useSetCallback(setAmp, 'decay')} >
            Decay
          </Dial>
          <Dial
            value={amp.sustain}
            onChange={useSetCallback(setAmp, 'sustain')} >
            Sustain
          </Dial>
          <Dial
            value={amp.release}
            onChange={useSetCallback(setAmp, 'release')} >
            Release
          </Dial>
        </div>
      </section>
      <section id='filter-env'>
        <h2>Filter</h2>
        <div className='knob-row'>
          <Dial
            value={filter.attack}
            onChange={useSetCallback(setFilter, 'attack')} >
            Attack
          </Dial>
          <Dial
            value={filter.decay}
            onChange={useSetCallback(setFilter, 'decay')} >
            Decay
          </Dial>
          <Dial
            value={filter.sustain}
            onChange={useSetCallback(setFilter, 'sustain')} >
            Sustain
          </Dial>
          <Dial
            value={filter.release}
            onChange={useSetCallback(setFilter, 'release')} >
            Release
          </Dial>
          <Dial
            value={filter.base}
            onChange={useSetCallback(setFilter, 'base')} >
            Base
          </Dial>
          <Dial
            value={filter.range}
            onChange={useSetCallback(setFilter, 'range')} >
            Range
          </Dial>
          <Dial
            value={filter.q}
            onChange={useSetCallback(setFilter, 'q')} >
            Q
          </Dial>
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
      <PianoRoll currentStep={currentStep} />
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatch
)(Synth1);
