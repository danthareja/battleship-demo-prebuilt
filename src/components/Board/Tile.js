import React from 'react';
import PropTypes from 'prop-types';
import Token from './Token';

import './Tile.css';

const Tile = function({ tile, onClick, isClickable }) {
  let token = null;

  if (tile === 1) {
    token = <Token color="yellow" />
  } else if (tile === 2) {
    token = <Token color="red" />
  }

  return (
    <div className="Tile">
      {token}
    </div>
  );
};

Tile.propTypes = {
  tile: PropTypes.any.isRequired
};

export default Tile;
