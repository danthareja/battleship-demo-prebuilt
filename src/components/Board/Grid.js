import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';
import Token from './Token';

import './Grid.css';

class Grid extends React.Component {
  state = {
    activeCol: null
  }

  handleMouseEnter = (col) => {
    if (this.props.isClickable(col)) {
      this.setState(state => ({
        activeCol: col
      }))
    }
  }

  handleMouseLeave = (col) => {
    if (this.state.activeCol !== null) {
      this.setState(state => ({
        activeCol: null
      }))
    }
  }

  render() {
    const { activeCol } = this.state;
    const {
      player,
      board,
      onClick = () => {},
      isClickable = () => false,
    } = this.props;

    // Transpose the board so it's easier to render a column together
    const transposed = board[0].map((col, i) => board.map(row => row[i]));
    return (
      <div className="Grid">
        {transposed.map((rows, col) => (
          <div
            key={col}
            className={`Grid__col ${activeCol === col ? 'Grid__col--active' : ''}`}
            onMouseEnter={() => this.handleMouseEnter(col)}
            onMouseLeave={this.handleMouseLeave}
            onClick={() => onClick(col)}
          >
            {activeCol === col && (
              <div className="Grid__col__token">
                <Tile tile={player} />
              </div>
              )}
            {/* Reverse the row so it's easier to map over */}
            {rows.slice().reverse().map((tile, row) => (
              <div key={[row,col].join(',')} className="Grid__row">
                <Tile tile={tile} />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

Grid.propTypes = {
  player: PropTypes.oneOf([1,2]).isRequired,
  board: PropTypes.any.isRequired,
  isClickable: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Grid;
