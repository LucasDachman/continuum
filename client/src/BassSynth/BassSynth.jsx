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
  currentCharacter: state.character.character
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
  currentCharacter
}) => {

  const disabled = currentCharacter !== 'bass';
  // actual render code
  return (
    <div className={`bass-synth synth ${disabled ? '' : 'current'} `}>
      <h2>Bass</h2>
      <div className='knob-row'>
        <Dial
          disabled={disabled}
          value={length}
          onChange={setLength} >
          Length
        </Dial>
        <Dial
          disabled={disabled}
          value={shape}
          onChange={setShape} >
          Shape
        </Dial>
        <Dial
          disabled={disabled}
          value={filterDecay}
          onChange={setFilterDecay} >
          Decay
        </Dial>
        <Dial
          disabled={disabled}
          value={filterRange}
          onChange={setFilterRange} >
          Brightness
        </Dial>
        <Dial
          disabled={disabled}
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
