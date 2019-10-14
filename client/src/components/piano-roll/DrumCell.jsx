import React, { useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCompositionCell as toggleDrummer } from '../../Drummer/drummerReducer';
import './cell.css';


const Cell = ({ row, col, playing }) => {
  const dispatch = useDispatch();
  const currentCharacter = useSelector(state => state.character.character);

  const handleClick = useCallback(e => {
    e.stopPropagation();
    currentCharacter === 'drummer' &&
      dispatch(toggleDrummer({ row, col }));
  }, [row, col, dispatch, currentCharacter]);

  const cell = useSelector(state => state.drummer.composition[row][col]);
  const isDrummer = currentCharacter === 'drummer';
  const className =  isDrummer ? 'piano-cell clickable' : 'piano-cell';

  return (
    <span className={className} onClick={handleClick} >
      {
        cell.active &&
        <span
          onClick={handleClick}
          className={
            'cell-trigger cell-trigger-drummer ' +
            `${playing ? 'playing' : ''} ` +
            `${isDrummer ? 'current' : ''}`
          }
        />
      }
    </span>
  );
}

export default memo(Cell);