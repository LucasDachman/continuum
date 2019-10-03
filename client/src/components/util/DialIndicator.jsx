import React, { useRef } from 'react';
import {
  useCircularInputContext,
  useCircularDrag
} from 'react-circular-input'

const DialIndicator = () => {
  const { getPointFromValue, center } = useCircularInputContext()
  const { x, y,  } = getPointFromValue()

  const ref = useRef(null)
  useCircularDrag(ref)

  return <line x1={center.x} y1={center.y} x2={x} y2={y} stroke='black' strokeWidth={1}/>;

}

export default DialIndicator;