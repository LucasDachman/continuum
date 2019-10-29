import React, { useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCompositionCell as setDrummer } from '../../Drummer/drummerReducer';
import './cell.css';


const Cell = ({ row, col, playing }) => {
  const dispatch = useDispatch();
  const currentCharacter = useSelector(state => state.character.character);
  const cell = useSelector(state => state.drummer.composition[row][col]);
  const maxReached = useSelector(state => state.util.maxReached);

  const handleClick = useCallback(e => {
    e.stopPropagation();
    if (currentCharacter === 'drummer') {
      const active = !cell.active;
      if (active && maxReached) return;
      dispatch(setDrummer({ row, col, active }));
    }
  }, [row, col, dispatch, currentCharacter, cell, maxReached]);

  const isDrummer = currentCharacter === 'drummer';
  let className = 'piano-cell';
  isDrummer && (className += ' clickable')
  playing && (className += ' playing')

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