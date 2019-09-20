import React from 'react';
import Cell from './Cell';
import { isBlack } from '../../util/notes-util';
import { setCompositionCell } from '../../redux/reducers/synth1Reducer';
import { notes } from '../../redux/config-creators/compositionReducerConfig';
import { connect } from 'react-redux';
import './piano-roll.css';

const mapStateToProps = state => ({
  composition: state.synth1.composition,
});

const mapDispatchToProps = {
  setCompositionCell
}

const PianoRoll = ({ activeColumn, composition }) => {

  return (
    <div className='piano-roll'>
      <section className='piano-roll-keys'>
        {notes.map((n) => {
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