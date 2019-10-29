import React from 'react';
import {useSelector} from 'react-redux';
import Cell from './Cell';
import { notes, numSteps } from '../../redux/config-creators/compositionReducerConfig';
import { range } from 'lodash';
import './piano-roll.css';

const PianoRoll = ({ currentStep }) => {
  const currentCharacter = useSelector(state => state.character.character);
  return (
    <div className={`piano-roll ${currentCharacter}`}>
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
