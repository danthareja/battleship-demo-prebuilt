/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { GameInfo } from 'oasis-game-components';

import Background from './Background';
import Grid from './Grid';

class Board extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.number,
    isSpectating: PropTypes.bool,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
  };

  onClick(x, y) {
    if (this.isClickable(x, y)) {
      this.props.moves.click_tile(x, y);
    }
  }

  isClickable(x, y) {
    const { ctx, playerID } = this.props;
    const { other } = this.getBoards();

    const myTurn =
      playerID &&
      (ctx.current_player === playerID ||
        (ctx.active_players && ctx.active_players.indexOf(playerID) !== -1));

    return !ctx.gameover && myTurn && other[x][y] === 'Water';
  }

  isShip(tile) {
    return typeof tile === 'object';
  }

  getShipId(tile) {
    if (!this.isShip(tile)) {
      throw new Error('Invalid tile');
    }

    return tile['Ship'] !== undefined ? tile['Ship'] : tile['Hit'];
  }

  isSameShip(tileA, tileB) {
    return (
      this.isShip(tileA) &&
      this.isShip(tileB) &&
      this.getShipId(tileA) === this.getShipId(tileB)
    );
  }

  isShipStart(board, tile, x, y) {
    const left = board[x][y - 1];
    const up = board[x - 1] && board[x - 1][y];

    return !this.isSameShip(tile, left) && !this.isSameShip(tile, up);
  }

  getShipSize(tile) {
    // Hardcoded assumption based on data from hits_left
    const SIZES = [2, 2, 2, 3, 3, 4, 5];
    return SIZES[this.getShipId(tile)];
  }

  getShipHitsLeft(tile) {
    const hitsLeft = this.getHitsLeft();
    return hitsLeft[this.getShipId(tile)];
  }

  getShipOrientation(board, tile, x, y) {
    const right = board[x][y + 1];

    if (this.isSameShip(tile, right)) {
      return 'horizontal';
    }

    return 'vertical';
  }

  getShip(board, tile, x, y) {
    if (!this.isShip(tile)) {
      return null;
    }

    if (!this.isShipStart(board, tile, x, y)) {
      return null;
    }

    return {
      size: this.getShipSize(tile),
      dead: this.getShipHitsLeft(tile) === 0,
      orientation: this.getShipOrientation(board, tile, x, y),
    };
  }

  getVictoryInfo() {
    let gameover = this.props.ctx.gameover;
    if (gameover) {
      let victoryInfo = {};
      if (!gameover.winner) {
        var color = 'orange';
        var text = "It's a draw!";
      } else {
        color =
          gameover.winner == this.props.playerID || this.props.isSpectating
            ? 'green'
            : 'red';
        text = `Player ${gameover.winner} won!`;
      }
      victoryInfo.winner = (
        <div className={color} id="winner">
          {text}
        </div>
      );
      victoryInfo.color = color;
      return victoryInfo;
    }
    return null;
  }

  getBoards() {
    switch (this.props.playerID) {
      case 1:
        return {
          mine: this.props.G.boards[0],
          other: this.props.G.boards[1],
        };
      case 2:
        return {
          mine: this.props.G.boards[1],
          other: this.props.G.boards[0],
        };
      default:
        throw new Error('Invalid player');
    }
  }

  getHitsLeft() {
    switch (this.props.playerID) {
      case 1:
        return this.props.G.hits_left[0];
      case 2:
        return this.props.G.hits_left[1];
      default:
        throw new Error('Invalid player');
    }
  }

  render() {
    let victoryInfo = this.getVictoryInfo();
    let { mine, other } = this.getBoards();

    return (
      <React.Fragment>
        <Background>
          <Grid board={mine} getShip={this.getShip.bind(this)} />
          <Grid
            board={other}
            isClickable={this.isClickable.bind(this)}
            onClick={this.onClick.bind(this)}
          />
        </Background>
        <GameInfo
          winner={victoryInfo ? victoryInfo.winner : null}
          {...this.props}
        />
      </React.Fragment>
    );
  }
}

export default Board;
