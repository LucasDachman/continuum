import React from 'react';
import { connect } from 'react-redux';
import { setFilterFreq, setDelay } from './drummerReducer';
import Dial from '../components/util/Dial.jsx';

const mapStateToProps = state => ({
  filterFreq: state.drummer.filterFreq,
  delay: state.drummer.delay,
  currentCharacter: state.character.character
});

const mapDispatchToProps = {
  setFilterFreq,
  setDelay
}

const Drummer = ({
  filterFreq,
  setFilterFreq,
  delay,
  setDelay,
  currentCharacter
}) => {
  const disabled = currentCharacter !== 'drummer';
  return (
    <div className={`drummer-synth synth ${disabled ? '' : 'current'} `}>
      <div className='knob-row knob-row-horizontal'>
        <Dial
          value={filterFreq}
          onChange={setFilterFreq}
          disabled={disabled}>
          Brightness
        </Dial>
        <Dial
          value={delay}
          onChange={setDelay}
          disabled={disabled}>
          Delay
        </Dial>
      </div>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Drummer);