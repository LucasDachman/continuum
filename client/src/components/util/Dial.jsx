import React, { memo, useCallback } from 'react';
import { throttle } from 'lodash';

import {
  CircularInput,
  CircularTrack,
  CircularProgress,
} from 'react-circular-input';
import DialIndicator from './DialIndicator';

const Dial = ({ value, onChange, children, disabled }) => {

  const handleChange = useCallback(throttle(v => {
    onChange(v)
  }, 100), [onChange])

  const mainColor = disabled ? 'lightgray' : 'black'

  return (
    <div className='knob'>
      <div>
        <CircularInput radius={21}
          value={value}
          onChange={disabled ? () => {} : handleChange}>
          <CircularTrack stroke='lightgray' strokeWidth={1} strokeLinecap='square'/>
          <CircularProgress stroke={mainColor} strokeWidth={2}  strokeLinecap='square'/>
          <DialIndicator strokeWidth={2} stroke={mainColor}/>
        </CircularInput>
      </div>
      <div style={{ color: mainColor, zIndex: -1 }}>{children}</div>
    </div>
  );
}

export default memo(Dial);