import React, { useRef } from 'react';
import {
  useCircularInputContext,
  useCircularDrag
} from 'react-circular-input'

const DialIndicator = ({strokeWidth}) => {
  const { getPointFromValue, center } = useCircularInputContext()
  const { x, y,  } = getPointFromValue()

  const ref = useRef(null)
  useCircularDrag(ref)

  return <g>
    <line x1={center.x} y1={center.y} x2={x} y2={y} stroke='black' strokeWidth={strokeWidth}/>
    {/* <line x1={center.x} y1={center.y} x2={x} y2={y} stroke='white' strokeOpacity={0} strokeWidth={6}/> */}
    <circle ref={ref} cx={x} cy={y} r={20} stroke='white' opacity={0}/>
  </g> 

}

export default DialIndicator;