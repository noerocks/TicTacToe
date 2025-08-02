import React from "react";
import Cell from "./Cell";
import { generatePatterns } from "../utils/patternGenerator";
import ConfettiExplosion from "react-confetti-explosion";
import clickSound from "../assets/click.mp3";
import winnerSound from "../assets/winner.mp3";

class Game extends React.Component {
  state = {
    cells: Array(9)
      .fill({ isClicked: false, player: undefined })
      .map((cell, index) => ({ ...cell, key: (index + 1) * 10 })),
    turn: "X",
    isPlaying: true,
    message: undefined,
    winningPattern: undefined,
  };

  winningPatterns = generatePatterns();

  componentDidUpdate = () => {
    if (this.state.isPlaying) {
      const result = this.checkWinner();
      if (result) {
        new Audio(winnerSound).play();
        const { pattern, winner } = result;
        this.setState({
          isPlaying: false,
          message: `Player ${winner} wins`,
          winningPattern: pattern,
        });
      } else if (this.noSpace()) {
        console.log("tie");
        this.setState({ isPlaying: false, message: "Tie" });
      }
    }
  };

  handleClick = (e) => {
    const cellIndex = e.target.dataset.cellIndex;
    if (cellIndex && this.state.isPlaying) {
      if (
        !this.state.cells.filter((_, index) => index == cellIndex)[0].isClicked
      ) {
        new Audio(clickSound).play();
        this.setState((prevState) => {
          const nextCells = [...prevState.cells].map((cell, index) =>
            cellIndex == index
              ? {
                  isClicked: true,
                  player: prevState.turn,
                  key: cell.key,
                }
              : cell
          );
          return { cells: nextCells, turn: prevState.turn === "X" ? "O" : "X" };
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
          return { pattern, winner };
        }
      }
    }
    return undefined;
  };

  noSpace = () => {
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
      winningPattern: undefined,
    });
  };

  render() {
    const { cells, turn, message, isPlaying, winningPattern } = this.state;
    return (
      <div
        onClick={this.handleClick}
        className="flex flex-col justify-center items-center gap-10"
      >
        <div className="grid grid-cols-3 gap-2 bg-gray-600">
          {cells.map((cell, index) => (
            <Cell
              key={cell.key}
              index={index}
              cell={cell}
              winningPattern={winningPattern}
              isPlaying={isPlaying}
            />
          ))}
        </div>
        <div className="w-full relative flex justify-center gap-5 items-center">
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
              {winningPattern && (
                <ConfettiExplosion className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              )}
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
