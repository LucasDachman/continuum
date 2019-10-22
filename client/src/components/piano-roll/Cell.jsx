import React, { useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCompositionCell as toggle1 } from '../../redux/reducers/synth1Reducer';
import { toggleCompositionCell as toggleBass } from '../../BassSynth/bassReducer';
import { toggleCompositionCell as toggleLenny } from '../../LennySynth/lennyReducer';
import _ from 'lodash'
import './cell.css';

const toggleActions = {
  synth1: toggle1,
  bass: toggleBass,
  lenny: toggleLenny,
};

const Cell = ({ row, col, playing }) => {
  const dispatch = useDispatch();

  const currentCharacter = useSelector(state => state.character.character);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    Boolean(toggleActions[currentCharacter]) &&
      dispatch(toggleActions[currentCharacter]({ row, col }));
  }, [row, col, currentCharacter, dispatch]);

  const cells = {
    synth1: useSelector(state => state.synth1.composition[row][col]),
    bass: useSelector(state => state.bass.composition[row][col]),
    lenny: useSelector(state => state.lenny.composition[row][col]),
  };

  const className = currentCharacter in cells ? 'piano-cell clickable' : 'piano-cell';

  return (
    <span style={{backgroundColor: playing ? '#f7f7f7' : 'white'}} className={className} onClick={handleClick} >
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