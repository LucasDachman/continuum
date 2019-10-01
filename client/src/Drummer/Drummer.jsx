import React from 'react';
import { connect } from 'react-redux';
import { setFilterFreq } from './drummerReducer';
import Dial from '../components/util/Dial.jsx';

const mapStateToProps = state => ({
  filterFreq: state.drummer.filterFreq,
});

const mapDispatchToProps = {
  setFilterFreq
}

const Drummer = ({
  filterFreq,
  setFilterFreq
}) => {
  return (
    <div className='drummer-synth synth'>
      <h2>Drummer</h2>
      <div className='knob-row knob-row-vertical'>
        <Dial
          value={filterFreq}
          onChange={setFilterFreq}>
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