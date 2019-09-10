import React from 'react';

import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb,
} from 'react-circular-input'

const Dial = ({ value, onChange, children }) => {

  return (
    <div className='knob'>
      <CircularInput radius={28}
        value={value}
        onChange={onChange}>
        <CircularTrack strokeWidth={14} />
        <CircularProgress strokeWidth={14} />
        <CircularThumb r='8' />
      </CircularInput>
      {children}
    </div>
  );
}

export default Dial;