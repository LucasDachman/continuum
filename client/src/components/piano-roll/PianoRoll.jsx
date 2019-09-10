import React from 'react';
import CellRow from './CellRow';
import { isBlack } from 'continuum-shared/util/notes-util';
import { setCompositionCell } from 'continuum-shared/redux/reducers/synth1UIReducer';
import {connect} from 'react-redux';
import './piano-roll.css';

const mapStateToProps = state => ({
  notes: state.synth1UI.notes,
  composition: state.synth1UI.composition,
});

const mapDispatchToProps = {
  setCompositionCell
}

const PianoRoll = ({ setCompositionCell, activeColumn, notes}) => {

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
        {notes.map((n, rowI) => (
          <CellRow
            row={rowI}
            black={isBlack(n)}
            key={rowI} />
        ))}
      </section>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PianoRoll);