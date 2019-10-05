import React, { Fragment } from 'react';
import Cell from './Cell';
import { isBlack } from '../../util/notes-util';
import { notes, numSteps } from '../../redux/config-creators/compositionReducerConfig';
import { range } from 'lodash';
import { useSelector } from 'react-redux';
import './piano-roll.css';

const PianoRoll = ({ currentStep }) => {
  const drumFiles = useSelector(state => state.drummer.files);
  const character = useSelector(state => state.character.character);

  return (
    <div className='piano-roll'>
      <section className='piano-roll-keys'>
        {notes.map((n, i) => {
          const className = ['piano-key', isBlack(n) ? 'black' : 'white'].join(' ');
          return (
            <div
              className={className}
              key={n.name}>
              <p>{character === 'drummer' && drumFiles[i] ? drumFiles[i].name : n.name}</p>
            </div>
          );
        })}
      </section>
      <section className='piano-roll-editor'>
        {
          notes.map((n, rowNum) =>
            <section key={n.name} className={'step-row'}>
              {
                range(numSteps).map(colNum =>
                  <Fragment key={`${rowNum}, ${colNum}`}>
                    {currentStep === colNum && <VDivider />}
                    <Cell row={rowNum} col={colNum} />
                  </Fragment>
                )
              }
            </section>
          )
        }
      </section>
    </div>
  );
}

const VDivider = () => (
  <div style={{
    height: '100%',
    width: '0px',
  }}>
    <div style={{ height: '100%', width: '1px', zIndex: 2, backgroundColor: '#E6E6E6' }} />
  </div>
);

export default PianoRoll;
