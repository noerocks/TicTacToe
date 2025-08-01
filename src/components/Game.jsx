import React from "react";
import Cell from "./Cell";

class Game extends React.Component {
  state = {
    cells: Array(9)
      .fill({ isClicked: false, player: "" })
      .map((cell, index) => ({ ...cell, key: (index + 1) * 10 })),
  };
  render() {
    return (
      <div>
        <div className="grid grid-cols-3 gap-2 bg-gray-600">
          {this.state.cells.map((cell) => (
            <Cell key={cell.key} cell={cell} />
          ))}
        </div>
      </div>
    );
  }
}

export default Game;
