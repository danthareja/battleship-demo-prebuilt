import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';
import Ship from './Ship';
import './Grid.css';

const Grid = function({
  board,
  onClick = () => {},
  isClickable = () => false,
  getShip = () => null,
}) {
  return (
    <div className="Grid">
      {board.map((row, x) => (
        <div key={x} className="Grid__row">
          {row.map((tile, y) => {
            const ship = getShip(board, tile, x, y);
            return (
              <div key={[x, y].join(',')} className="Grid__col">
                <Tile
                  tile={tile}
                  isClickable={isClickable(x, y)}
                  onClick={() => onClick(x, y)}
                />
                {ship && <Ship {...ship} />}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

Grid.propTypes = {
  board: PropTypes.any.isRequired,
  getShip: PropTypes.func,
  isClickable: PropTypes.func,
  onClick: PropTypes.func,
};

export default Grid;
