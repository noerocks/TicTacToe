import React from "react";
import Cell from "./Cell";
import { generatePatterns } from "../utils/patternGenerator";

class Game extends React.Component {
  state = {
    cells: Array(9)
      .fill({ isClicked: false, player: undefined })
      .map((cell, index) => ({ ...cell, key: (index + 1) * 10 })),
    turn: "X",
    isPlaying: true,
    message: undefined,
  };
  winningPatterns = generatePatterns();
  componentDidUpdate = () => {
    if (!this.isTie() && this.state.isPlaying) {
      const winner = this.checkWinner();
      if (winner) {
        this.setState({ isPlaying: false, message: `Player ${winner} wins` });
      }
    } else {
      if (this.state.isPlaying) {
        this.setState({ isPlaying: false, message: "Tie" });
      }
    }
  };
  handleClick = (e) => {
    const cellId = e.target.dataset.cellId;
    if (cellId && this.state.isPlaying) {
      if (!this.state.cells.filter((cell) => cell.key == cellId)[0].isClicked) {
        this.setState((prevState) => {
          const nextPrevs = [...prevState.cells].map((cell) =>
            cellId == cell.key
              ? {
                  isClicked: true,
                  player: prevState.turn,
                  key: cell.key,
                }
              : cell
          );
          return { cells: nextPrevs, turn: prevState.turn === "X" ? "O" : "X" };
        });
      }
    }
  };
  checkWinner = () => {
    const { cells } = this.state;
    for (let i = 0; i < this.winningPatterns.length; i++) {
      const pattern = this.winningPatterns[i];
      if (
        cells[pattern[0]].player === cells[pattern[1]].player &&
        cells[pattern[1]].player === cells[pattern[2]].player
      ) {
        const winner = cells[pattern[0]].player;
        if (winner) {
          return winner;
        }
      }
    }
    return undefined;
  };
  isTie = () => {
    return this.state.cells.every((cell) => cell.player);
  };
  resetGame = () => {
    this.setState({
      cells: Array(9)
        .fill({ isClicked: false, player: undefined })
        .map((cell, index) => ({ ...cell, key: (index + 1) * 10 })),
      turn: "X",
      isPlaying: true,
      message: undefined,
    });
  };
  render() {
    const { cells, turn, message, isPlaying } = this.state;
    return (
      <div
        onClick={this.handleClick}
        className="flex flex-col justify-center items-center gap-10"
      >
        <div className="grid grid-cols-3 gap-2 bg-gray-600">
          {cells.map((cell) => (
            <Cell key={cell.key} cell={cell} />
          ))}
        </div>
        <div className="w-full flex justify-center gap-5 items-center">
          {isPlaying ? (
            <React.Fragment>
              <p className="text-3xl text-gray-400">{`Player ${turn}'s turn`}</p>
              <button
                onClick={this.resetGame}
                className="text-2xl text-gray-200 bg-gray-500 py-2 px-5 rounded-md cursor-pointer hover:scale-102"
              >
                Reset
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p className="text-3xl text-gray-400">{message}</p>
              <button
                onClick={this.resetGame}
                className="text-2xl text-gray-200 bg-gray-500 py-2 px-5 rounded-md cursor-pointer hover:scale-102"
              >
                Play again
              </button>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default Game;
