import React from 'react';

import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb,
} from 'react-circular-input'

const Dial = ({ value, onChange }) => {

  return (
    <CircularInput radius={40}
      value={value}
      onChange={onChange}>
      <CircularTrack strokeWidth={14} />
      <CircularProgress strokeWidth={14}/>
      <CircularThumb r='8' />
    </CircularInput>
  );
}

export default Dial;