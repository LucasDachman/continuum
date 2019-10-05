import React, { useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCompositionCell as toggle1 } from '../../redux/reducers/synth1Reducer';
import { toggleCompositionCell as toggleBass } from '../../BassSynth/bassReducer';
import { toggleCompositionCell as toggleLenny } from '../../LennySynth/lennyReducer';
import { toggleCompositionCell as toggleDrummer } from '../../Drummer/drummerReducer';
import _ from 'lodash'

const toggleActions = {
  synth1: toggle1,
  bass: toggleBass,
  lenny: toggleLenny,
  drummer: toggleDrummer
};

const Cell = ({ row, col }) => {
  const dispatch = useDispatch();

  const currentCharacter = useSelector(state => state.character.character);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    dispatch(toggleActions[currentCharacter]({ row, col }));
  }, [row, col, currentCharacter, dispatch]);

  const cells = {
    synth1: useSelector(state => state.synth1.composition[row][col]),
    bass: useSelector(state => state.bass.composition[row][col]),
    lenny: useSelector(state => state.lenny.composition[row][col]),
    drummer: useSelector(state => state.drummer.composition[row][col])
  };

  return (
    <span className='piano-cell' onClick={handleClick} >
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
  );
}

export default memo(Cell);