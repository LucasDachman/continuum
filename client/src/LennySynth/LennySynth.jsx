import React from 'react';
import { connect } from 'react-redux';
import Dial from '../components/util/Dial.jsx';
import {
  setReverb
} from './lennyReducer';

const mapStateToProps = state => ({
  reverb: state.lenny.reverb
});

const mapDispatchToProps = {
  setReverb
};

const LennySynth = ({
  reverb,
  setReverb
}) => {
  return (
    <div className='lenny-synth synth'>
      <h1 style={{ textAlign: 'center' }}>Lenny</h1>
      <div className='knob-row'>
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