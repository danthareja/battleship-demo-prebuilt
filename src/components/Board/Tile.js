import React from 'react';
import PropTypes from 'prop-types';
import Peg from './Peg';
import './Tile.css';

const Tile = function({ tile, onClick, isClickable = false }) {
  let peg = null;

  if (typeof tile === 'object') {
    if (tile['Hit'] !== undefined) {
      peg = <Peg hit />;
    }
  } else if (typeof tile === 'string') {
    if (tile === 'Miss') {
      peg = <Peg />;
    }
  }

  return (
    <div
      className={`Tile ${isClickable ? 'Tile__clickable' : ''}`}
      onClick={onClick}
    >
      {peg}
    </div>
  );
};

Tile.propTypes = {
  tile: PropTypes.any.isRequired,
  isClickable: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Tile;
