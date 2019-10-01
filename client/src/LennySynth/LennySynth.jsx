import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import Dial from '../components/util/Dial.jsx';
import {
  setReverb,
  setLength,
  setPhaser
} from './lennyReducer';

const mapStateToProps = state => ({
  reverb: state.lenny.reverb,
  length: state.lenny.length,
  phaser: state.lenny.phaser
});

const mapDispatchToProps = {
  setReverb,
  setLength,
  setPhaser
};

const LennySynth = ({
  reverb,
  setReverb,
  length,
  setLength,
  phaser,
  setPhaser
}) => {
  return (
    <div className='lenny-synth synth'>
      <h2>Lenny</h2>
      <div className='knob-row knob-row-horizontal'>
        <Dial
          value={length}
          onChange={setLength} >
          Length
        </Dial>
        <Dial
          value={reverb}
          onChange={setReverb} >
          Reverb
        </Dial>
        <input type='checkbox' checked={phaser} onChange={useCallback(e => setPhaser(e.target.checked), [setPhaser])}/>
      </div>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LennySynth);