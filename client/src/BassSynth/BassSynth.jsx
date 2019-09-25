import React from 'react';
import { connect } from 'react-redux';
import {
  setCompositionCell,
  setLength,
  setShape,
  setFilterDecay,
  setFilterRange,
  setFilterQ
} from './bassReducer';
import Dial from '../components/util/Dial';

const mapDispatch = {
  setCompositionCell,
  setLength,
  setShape,
  setFilterDecay,
  setFilterRange,
  setFilterQ
};

const mapStateToProps = state => ({
  length: state.bass.length,
  shape: state.bass.shape,
  filterDecay: state.bass.filter.decay,
  filterRange: state.bass.filter.range,
  filterQ: state.bass.filter.q,
});

const BassSynth = ({
  setLength,
  setShape,
  setFilterDecay,
  setFilterRange,
  setFilterQ,
  length,
  shape,
  filterDecay,
  filterRange,
  filterQ,
}) => {

  // actual render code
  return (
    <div className='bass-synth synth'>
      <h2>Bass Synth</h2>
      <div className='knob-row knob-row-horizontal'>
        <Dial
          value={length}
          onChange={setLength} >
          Length
        </Dial>
        <Dial
          value={shape}
          onChange={setShape} >
          Shape
        </Dial>
        <Dial
          value={filterDecay}
          onChange={setFilterDecay} >
          Decay
        </Dial>
        <Dial
          value={filterRange}
          onChange={setFilterRange} >
          Brightness
        </Dial>
        <Dial
          value={filterQ}
          onChange={setFilterQ} >
          Harshness
        </Dial>
      </div>
    </div >
  );
}

export default connect(
  mapStateToProps,
  mapDispatch
)(BassSynth);
