import React, { useRef, useEffect } from 'react';
import shortid from 'shortid';

const Nexus = window.Nexus;

const Dial = ({ value, onChange }) => {

  const id = useRef(shortid.generate());
  const dial = useRef();

  useEffect(() => {
    if (dial.current) {
      dial.current.value = value;
    }
  }, [value]);

  useEffect(() => {
    dial.current = new Nexus.Dial(id.current, { value })
    dial.current.on('change', onChange);
  }, [value, onChange]);

  return (
    <div id={id.current}></div>
  );
}

export default Dial;