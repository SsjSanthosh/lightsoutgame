import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStarts: 0.25
  };
  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
    this.createBoard = this.createBoard.bind(this);
    // TODO: set initial state
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        row.push(Math.random() < this.props.chanceLightStarts);
      }
      board.push(row);
    }
    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    console.log("flipping", coord);
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // flip initial cell

    // TODO: flip this cell and the cells around it
    flipCell(y, x);
    // flip top
    flipCell(y + 1, x);
    // flip bottom
    flipCell(y - 1, x);
    // flip left
    flipCell(y, x - 1);
    // flip right
    flipCell(y, x + 1);
    // win when every cell is turned off
    // TODO: determine is the game has been won
    let hasWon = board.every(row => row.every(cell => !cell));
    // this.setState({board, hasWon});
    this.setState({ board: board, hasWon: hasWon });
  }

  /** Render game board or winning message. */

  render() {
    if (this.state.hasWon) {
      return (
        <div className="Board-title">
          <div class="winner">
            <span className="neon">YOU</span>
            <span className="flux">WIN!</span>
          </div>
        </div>
      );
    }
    // if the game is won, just show a winning msg & render nothing else
    // TODO
    // make table board
    // TODO
    let tblBoard = [];
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        let coord = `${y}-${x}`;
        row.push(
          <Cell
            isLit={this.state.board[y][x]}
            key={coord}
            flipCellsAroundMe={() => {
              this.flipCellsAround(coord);
            }}
          />
        );
      }
      tblBoard.push(<tr>{row}</tr>);
    }
    return (
      <div>
        <div className="Board-title">
          <div className="neon">Lights</div>
          <div className="flux">Out</div>
        </div>
        <table className="Board">
          <tbody>{tblBoard}</tbody>
        </table>
      </div>
    );
  }
}

export default Board;
