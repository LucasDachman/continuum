import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { setAmp, setFilter } from '../../redux/reducers/synth1Reducer';
import Dial from '../util/Dial';

const mapDispatch = {
  setAmp,
  setFilter,
};

const mapStateToProps = state => ({
  amp: state.synth1.amp,
  filter: state.synth1.filter,
});

const useSetCallback = (set, attr) => {
  return useCallback(v => set({ [attr]: v }), [set, attr]);
}

const Synth1 = ({ setAmp, setFilter, amp, filter }) => {

  // actual render code
  return (
    <div className='synth-1'>
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
        </div>
        <div className='knob-row'>
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
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatch
)(Synth1);
