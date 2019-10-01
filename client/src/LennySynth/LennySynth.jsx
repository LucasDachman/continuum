import React from 'react';
import { connect } from 'react-redux';
import Dial from '../components/util/Dial.jsx';
import {
  setReverb,
  setLength
} from './lennyReducer';

const mapStateToProps = state => ({
  reverb: state.lenny.reverb,
  length: state.lenny.length
});

const mapDispatchToProps = {
  setReverb,
  setLength
};

const LennySynth = ({
  reverb,
  setReverb,
  length,
  setLength
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
      </div>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LennySynth);