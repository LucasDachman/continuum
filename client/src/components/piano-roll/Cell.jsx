import React, { useCallback } from 'react';
import { connect, useSelector } from 'react-redux';
import { setCompositionCell } from '../../redux/reducers/synth1UIReducer';
import { isBlack } from '../../util/notes-util';

const mapDispatchToProps = {
  setCompositionCell
}

const Cell = ({ row, col, setCompositionCell }) => {

  const cell = useSelector(state => state.synth1UI.composition[row][col]);
  const black = isBlack(cell.note);
  const { active } = cell;

  const className = ['piano-cell',
    black ? 'black' : 'white',
    active ? 'active' : 'inactive'
  ].join(' ');

  const handleClick = useCallback(() => {
    setCompositionCell({ row, col, active: !active })
  }, [setCompositionCell, row, col, active]);

  return (
    <span className={className} onClick={handleClick} />
  );
}

export default connect(
  null,
  mapDispatchToProps
)(Cell);