import React from 'react';
import { connect } from 'react-redux';
import { setFilterFreq } from './drummerReducer';
import Dial from '../components/util/Dial.jsx';

const mapStateToProps = state => ({
  filterFreq: state.drummer.filterFreq,
  currentCharacter: state.character.character
});

const mapDispatchToProps = {
  setFilterFreq
}

const Drummer = ({
  filterFreq,
  setFilterFreq,
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
          Filter Freq
        </Dial>
      </div>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Drummer);