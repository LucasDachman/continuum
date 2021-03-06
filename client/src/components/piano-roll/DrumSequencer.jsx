import React from 'react';
import { numSteps } from '../../redux/config-creators/compositionReducerConfig';
import { range } from 'lodash';
import { useSelector } from 'react-redux';
import './piano-roll.css';
import DrumCell from './DrumCell';

const DrumSequencer = ({ currentStep }) => {
  const drumFiles = useSelector(state => state.drummer.files);
  const currentCharacter = useSelector(state => state.character.character);

  return (
    <div className={`piano-roll drum-sequencer ${currentCharacter === 'drummer' ? 'drummer' : ''}`}>
      {/* <div className='piano-roll-keys'>
        {drumFiles.map((file, i) =>
          <div
            className='piano-key'
            key={file.name}>
            <p>{drumFiles[i].name}</p>
          </div>
        )}
      </div> */}
      <section className='piano-roll-editor'>
        {
          drumFiles.map((n, rowNum) =>
            <section key={n.name} className={'step-row'}>
              {
                range(numSteps).map(colNum =>
                  <DrumCell key={colNum} row={rowNum} col={colNum} playing={currentStep === colNum} />
                )
              }
            </section>
          )
        }
      </section>
    </div>
  );
}

export default DrumSequencer;
