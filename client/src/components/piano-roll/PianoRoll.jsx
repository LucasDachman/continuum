import React, { Fragment } from 'react';
import Cell from './Cell';
import { isBlack } from '../../util/notes-util';
import { notes, numSteps } from '../../redux/config-creators/compositionReducerConfig';
import { range } from 'lodash';
import './piano-roll.css';

const PianoRoll = ({ currentStep }) => {

  return (
    <div className='piano-roll'>
      <section className='piano-roll-keys'>
        {notes.map((n, i) => {
          const className = ['piano-key', isBlack(n) ? 'black' : 'white'].join(' ');
          return (
            <div
              className={className}
              key={n.name}>
              <p>{n.name}</p>
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
                  <Cell key={colNum} row={rowNum} col={colNum} playing={currentStep === colNum} />
                )
              }
            </section>
          )
        }
      </section>
    </div>
  );
}

export default PianoRoll;
