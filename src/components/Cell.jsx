import React from "react";

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isWinningCell: false };
  }
  static getDerivedStateFromProps = (nextProps) => {
    console.log(nextProps);
    return null;
  };
  shouldComponentUpdate = (nextProps) => {
    return this.props.cell.player !== nextProps.cell.player;
  };
  render() {
    const {
      index,
      cell: { player },
    } = this.props;
    return (
      <div
        data-cell-index={index}
        className="bg-gray-800 hover:cursor-pointer w-[165px] aspect-square flex justify-center items-center"
      >
        <p
          className={`permanent-marker-regular text-8xl select-none pointer-events-none ${
            player === "O" ? "text-blue-900" : "text-red-900"
          }`}
        >
          {player}
        </p>
      </div>
    );
  }
}

export default Cell;
