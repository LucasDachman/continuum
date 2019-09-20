import React from 'react';
import { useSelector } from 'react-redux';
import Cell from './Cell';

const CellRow = ({ row, black }) => {

  const className = black ? 'black' : 'white';

  const cells = useSelector(state => state.synth1.composition[row]);

  return (
    <section className={`step-row ${className}`}>
      <div className='steps-row'>
        {cells.map((cell, colIndex) => (
          <Cell 
            key={`${row}, ${colIndex}`}
            row={row}
            col={colIndex}
          />
        ))}
      </div>
    </section>
  );
}



export default CellRow;