import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile'

import './Grid.css';

const Grid = function({
  board,
  onClick = () => {},
  isClickable = () => false,
}) {
  // Transpose the board so it's easier to render a column together
  const transposed = board[0].map((col, i) => board.map(row => row[i]));
  return (
    <div className="Grid">
      {transposed.map((rows, col) => (
        <React.Fragment key={col}>
          <div
            className={`Grid__col ${isClickable(col) ? 'Grid__col__clickable' : ''}`}
            onClick={() => onClick(col)}
          >
            {/* Reverse the row so it's easier to map over */}
            {rows.slice().reverse().map((tile, row) => (
              <div key={[row,col].join(',')} className="Grid__row">
                <Tile tile={tile} />
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

Grid.propTypes = {
  board: PropTypes.any.isRequired,
  isClickable: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Grid;
