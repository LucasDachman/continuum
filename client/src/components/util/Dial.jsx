import React, { memo, useCallback } from 'react';
import { throttle } from 'lodash';

import {
  CircularInput,
  CircularTrack,
  CircularProgress,
} from 'react-circular-input';
import DialIndicator from './DialIndicator';

const Dial = ({ value, onChange, children }) => {

  const handleChange = useCallback(throttle(v => {
    onChange(v)
  }, 100), [onChange])

  return (
    <div className='knob'>
      <div>
        <CircularInput radius={21}
          value={value}
          onChange={handleChange}>
          <CircularTrack stroke='lightgray' strokeWidth={1} strokeLinecap='square'/>
          <CircularProgress stroke='black' strokeWidth={2}  strokeLinecap='square'/>
          <DialIndicator strokeWidth={2}/>
        </CircularInput>
      </div>
      <div style={{ zIndex: -1 }}>{children}</div>
    </div>
  );
}

export default memo(Dial);