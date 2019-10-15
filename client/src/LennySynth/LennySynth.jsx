import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import Dial from '../components/util/Dial.jsx';
import {
  setReverb,
  setLength,
  setPhaser,
  setVibratoDepth
} from './lennyReducer';

const mapStateToProps = state => ({
  reverb: state.lenny.reverb,
  length: state.lenny.length,
  phaser: state.lenny.phaser,
  vibratoDepth: state.lenny.vibratoDepth,
  currentCharacter: state.character.character
});

const mapDispatchToProps = {
  setReverb,
  setLength,
  setPhaser,
  setVibratoDepth
};

const LennySynth = ({
  reverb,
  setReverb,
  length,
  setLength,
  phaser,
  setPhaser,
  vibratoDepth,
  setVibratoDepth,
  currentCharacter
}) => {
  const disabled = currentCharacter !== 'lenny';
  return (
    <div className={`lenny-synth synth ${disabled ? '' : 'current'} `}>
      <h2>Synth</h2>
      <div className='knob-row knob-row-vertical'>
        <Dial
          disabled={disabled}
          value={length}
          onChange={setLength} >
          Length
        </Dial>
        <Dial
          disabled={disabled}
          value={reverb}
          onChange={setReverb} >
          Reverb
        </Dial>
        <input type='checkbox' checked={phaser} onChange={useCallback(e => setPhaser(e.target.checked), [setPhaser])} />
        <Dial
          disabled={disabled}
          value={vibratoDepth}
          onChange={setVibratoDepth} >
          Vibrato
          </Dial>
      </div>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LennySynth);