import React, { useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCompositionCell as set1 } from '../../redux/reducers/synth1Reducer';
import { setCompositionCell as setBass } from '../../BassSynth/bassReducer';
import { setCompositionCell as setLenny } from '../../LennySynth/lennyReducer';
import _ from 'lodash'
import './cell.css';

const setActions = {
  synth1: set1,
  bass: setBass,
  lenny: setLenny,
};

const Cell = ({ row, col, playing }) => {
  const dispatch = useDispatch();

  const currentCharacter = useSelector(state => state.character.character);

  const cells = {
    synth1: useSelector(state => state.synth1.composition[row][col]),
    bass: useSelector(state => state.bass.composition[row][col]),
    lenny: useSelector(state => state.lenny.composition[row][col]),
  };

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    if (Boolean(setActions[currentCharacter])) {
      const active = !cells[currentCharacter].active;
      dispatch(setActions[currentCharacter]({ row, col, active }));
    }
  }, [row, col, currentCharacter, dispatch, cells]);

  // const className = currentCharacter in cells ? 'piano-cell clickable' : 'piano-cell';
  let className = 'piano-cell';
  (currentCharacter in cells) && (className += ' clickable')
  playing && (className += ' playing')

  return (
    <span className={className} onClick={handleClick} >
      {
        _.map(cells, (cell, character) => {
          if (!cell.active) return;
          const cn = 'cell-trigger ' +
            `cell-trigger-${character} ` +
            `${playing ? 'playing' : ''} ` +
            `${currentCharacter === character ? 'current' : ''} `
          return <span
            key={character}
            onClick={handleClick}
            className={cn}
          />
        })
      }
    </span>
  );
}

export default memo(Cell);