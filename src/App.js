import React, { useState, useEffect } from 'react';
import './App.css';

const Nexus = window.Nexus;

const App = () => {

  const [val, setVal] = useState(null);

  useEffect(() => {
    const dial = new Nexus.Dial('#dial');
    dial.on('change', v => setVal(v));
  }, []);

  return (
    <div className='App'>
      <header>Hello, world</header>
      <div id='dial'></div>
      <h1>{val}</h1>
    </div>
  );
}

export default App;
