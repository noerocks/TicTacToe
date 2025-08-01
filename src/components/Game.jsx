import React from "react";
import Cell from "./Cell";
import { generatePatterns } from "../utils/patternGenerator";

class Game extends React.Component {
  state = {
    cells: Array(9)
      .fill({ isClicked: false, player: "" })
      .map((cell, index) => ({ ...cell, key: (index + 1) * 10 })),
    turn: "X",
    patterns: generatePatterns(),
  };
  handleClick = (e) => {
    const cellId = e.target.dataset.cellId;
    if (cellId) {
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
  render() {
    const { cells, turn } = this.state;
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
        <p className="text-3xl text-gray-400">{`Player ${turn}'s turn`}</p>
      </div>
    );
  }
}

export default Game;
