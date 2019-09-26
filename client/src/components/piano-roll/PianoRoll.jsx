import React from 'react';
import Cell from './Cell';
import { isBlack } from '../../util/notes-util';
import { setCompositionCell } from '../../redux/reducers/synth1Reducer';
import { notes } from '../../redux/config-creators/compositionReducerConfig';
import { connect } from 'react-redux';
import './piano-roll.css';

function importAll(r) {
  return r.keys().map(k => r(k));
}

const audioFiles = importAll(require.context('../../audio-files/', true, /\.wav$/));
const fileNames = audioFiles.reduce((acc, curr, i) => {
  acc[notes[i].name] = curr.match(/(?<=slices_)[0-9]+(?=\.)/);
  return acc;
}, {});

const mapStateToProps = state => ({
  composition: state.synth1.composition,
  character: state.character.character
});

const mapDispatchToProps = {
  setCompositionCell
}

const PianoRoll = ({ activeColumn, composition, character }) => {

  return (
    <div className='piano-roll'>
      <section className='piano-roll-keys'>
        {notes.map((n) => {
          const className = ['piano-key', isBlack(n) ? 'black' : 'white'].join(' ');
          const name = character === 'drummer' && fileNames[n.name] ? fileNames[n.name] : n.name;
          return (
            <div
              className={className}
              key={name}>
              <p>{name}</p>
            </div>
          );
        })}
      </section>
      <section className='piano-roll-editor'>
        {
          notes.map((n, rowI) =>
            <section key={rowI} className={`step-row ${isBlack(n) ? 'black' : 'white'}`}>
              {
                composition[rowI].map((cell, colIndex) =>
                  <Cell
                    key={`${rowI}, ${colIndex}`}
                    row={rowI}
                    col={colIndex}
                  />
                )
              }
            </section>
          )
        }
      </section>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PianoRoll);