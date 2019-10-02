import React, { memo, useCallback } from 'react';
import { throttle } from 'lodash';

import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb,
} from 'react-circular-input'

const Dial = ({ value, onChange, children }) => {

  const handleChange = useCallback(throttle(v => {
    onChange(v)
  }, 100), [onChange])

  return (
    <div className='knob'>
      <div>
        <CircularInput radius={18}
          value={value}
          onChange={handleChange}>
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