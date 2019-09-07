import React, { useRef, useEffect } from 'react';
import shortid from 'shortid';
import {isNumber} from 'lodash';

const Nexus = window.Nexus;

const Dial = ({ value, onChange }) => {

  const id = useRef(shortid.generate());
  const dial = useRef();

  useEffect(() => {
    if (!dial.current) {
      dial.current = new Nexus.Dial(id.current, { value })
      dial.current.on('change', onChange);
    }
  }, [value, onChange]);

  useEffect(() => {
    if (dial.current && isNumber(value)) {
      dial.current.value = value;
    }
  }, [value]);

  return (
    <div id={id.current}></div>
  );
}

export default Dial;