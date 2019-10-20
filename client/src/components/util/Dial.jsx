import React, { memo, useCallback } from 'react';
import { throttle } from 'lodash';
import { useSelector } from 'react-redux';

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

  const char = useSelector(state => state.character.character);
  const textColor = disabled ? 'lightgray' : 'black'
  const mainColor = disabled ? 'lightgray' : `var(--${char}Dark)`

  return (
    <div className='knob'>
      <div>
        <CircularInput radius={21}
          value={value}
          onChange={disabled ? () => { } : handleChange}>
          <CircularTrack stroke='lightgray' strokeWidth={1} strokeLinecap='square' />
          <CircularProgress style={{transition: 'stroke 1s'}} stroke={mainColor} strokeWidth={2} strokeLinecap='square' />
          <DialIndicator strokeWidth={2} stroke={mainColor} />
        </CircularInput>
      </div>
      <div style={{ color: textColor, zIndex: -1 }}>{children}</div>
    </div>
  );
}

export default memo(Dial);