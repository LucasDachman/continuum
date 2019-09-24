import React, { memo } from 'react';

import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb,
} from 'react-circular-input'

const Dial = ({ value, onChange, children }) => {

  return (
    <div className='knob'>
      <div>
        <CircularInput radius={18}
          value={value}
          onChange={onChange}>
          <CircularTrack strokeWidth={8} />
          <CircularProgress strokeWidth={8} />
          <CircularThumb r='6' />
        </CircularInput>
      </div>
      <div style={{ zIndex: -1 }}>{children}</div>
    </div>
  );
}

export default memo(Dial);