import React from 'react';
import PropTypes from 'prop-types';

import './Token.css';

const Token = function({ color }) {
  const src = require(`../../assets/2x/connect4_piece_${color}.png`);
  return <img className="Token" src={src} alt={`${color} token`}/>;
};

Token.propTypes = {
  color: PropTypes.oneOf(['red', 'yellow']).isRequired,
};

export default Token;
