import React, { useCallback, memo, useRef, useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { setCompositionCell as setComp1 } from '../../redux/reducers/synth1Reducer';
import { setCompositionCell as setComp2 } from '../../redux/reducers/synth2Reducer';
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
    synth2: useSelector(state => state.synth2.composition[row][col])
  };

  const cellRef = useRef();
  const [cellPosition, setCellPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    const { x, y, width, height } = cellRef.current.getBoundingClientRect();
    setCellPosition({ x, y, width, height });
  }, [cellRef, setCellPosition])


  const active = cells[currentCharacter].active;
  const handleClick = useCallback(() => {
    setComp({ row, col, active: !active })
  }, [setComp, row, col, active]);

  const { x, y, width, height } = cellPosition;


  const black = isBlack(cells[currentCharacter].note);
  const className = ['piano-cell',
    black ? 'black' : 'white',
  ].join(' ');

  return (
    <>
      <span ref={el => cellRef.current = el} className={className} onClick={handleClick} />
      <div style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'stretch',
      }}
        onClick={handleClick}
      >
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
      </div>
    </>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(memo(Cell));