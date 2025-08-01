import React from "react";

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isWinningCell: false };
  }

  static getDerivedStateFromProps = (nextProps) => {
    const { index, winningPattern, isPlaying } = nextProps;
    if (isPlaying) {
      return { isWinningCell: false };
    }
    return {
      isWinningCell: winningPattern.some((element) => element === index),
    };
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    return (
      this.props.cell.player !== nextProps.cell.player ||
      nextState.isWinningCell
    );
  };

  render() {
    const {
      index,
      cell: { player },
    } = this.props;
    return (
      <div
        data-cell-index={index}
        className={`hover:cursor-pointer w-[165px] aspect-square flex justify-center items-center
         ${
           this.state.isWinningCell
             ? "bg-gray-700 transition-colors duration-150"
             : "bg-gray-800"
         }`}
      >
        <p
          className={`permanent-marker-regular text-8xl select-none pointer-events-none ${
            player === "O" ? "text-blue-900" : "text-red-900"
          } ${this.state.isWinningCell ? "" : ""}`}
        >
          {player}
        </p>
      </div>
    );
  }
}

export default Cell;
