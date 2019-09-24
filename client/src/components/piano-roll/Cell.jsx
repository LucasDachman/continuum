import React, { useCallback, memo, useRef, useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { setCompositionCell as setComp1 } from '../../redux/reducers/synth1Reducer';
import { setCompositionCell as setComp2 } from '../../BassSynth/bassReducer';
import { isBlack } from '../../util/notes-util';
import _ from 'lodash'

const mapDispatchToProps = {
  setComp1,
  setComp2
}

const Cell = ({ row, col, setComp1, setComp2 }) => {

  const currentCharacter = useSelector(state => state.character.character);
  const setComp = currentCharacter === 'synth1' ? setComp1 : setComp2;
  const cells = {
    synth1: useSelector(state => state.synth1.composition[row][col]),
    bass: useSelector(state => state.bass.composition[row][col])
  };

  const active = cells[currentCharacter].active;
  const handleClick = useCallback(() => {
    setComp({ row, col, active: !active })
  }, [setComp, row, col, active]);

  const black = isBlack(cells[currentCharacter].note);
  const className = ['piano-cell',
    black ? 'black' : 'white',
  ].join(' ');

  return (
    <>
      <span className={className} onClick={handleClick} >
        {
          _.map(cells, (cell, character) => {
            return (cell.active &&
              <span
                key={character}
                onClick={handleClick}
                className={`cell-trigger cell-trigger-${character}`}
              />)
          })
        }
      </span>
    </>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(memo(Cell));