import React, { useCallback } from 'react';
import { connect, useSelector } from 'react-redux';
import { setCompositionCell as setComp1 } from '../../redux/reducers/synth1Reducer';
import { setCompositionCell as setComp2 } from '../../redux/reducers/synth2Reducer';
import { isBlack } from '../../util/notes-util';

const mapDispatchToProps = {
  setComp1,
  setComp2
}

const Cell = ({ row, col, setComp1, setComp2 }) => {

  const cell = useSelector(state => state.synth1.composition[row][col]);
  const black = isBlack(cell.note);
  const { active } = cell;

  const className = ['piano-cell',
    black ? 'black' : 'white',
    active ? 'active' : 'inactive'
  ].join(' ');

  const handleClick = useCallback(() => {
    setComp1({ row, col, active: !active })
    setComp2({ row, col, active: !active })
  }, [setComp1, setComp2, row, col, active]);

  return (
    <span className={className} onClick={handleClick} />
  );
}

export default connect(
  null,
  mapDispatchToProps
)(Cell);