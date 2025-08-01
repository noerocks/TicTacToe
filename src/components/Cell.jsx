import React from "react";

class Cell extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="p-10 bg-gray-800 hover:cursor-pointer">
        <p className="text-6xl select-none">{this.props.cell.key}</p>
      </div>
    );
  }
}

export default Cell;
