import React, { Fragment } from 'react';
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

const PianoRoll = ({ currentStep, composition }) => {

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
            <React.Fragment key={rowI} >

              <section className={`step-row ${isBlack(n) ? 'black' : 'white'}`}>
                {
                  composition[rowI].map((cell, colIndex) =>
                    <Fragment key={`${rowI}, ${colIndex}`}>
                      {
                        currentStep === colIndex &&
                        <div style={{
                          height: '100%',
                          width: '0px',
                        }}>
                          <div style={{height: '100%', width: '1px', zIndex: 2, backgroundColor: '#E6E6E6'}} />
                        </div>
                      }
                      <Cell
                        row={rowI}
                        col={colIndex}
                      />
                    </Fragment>
                  )
                }
              </section>
            </React.Fragment>
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