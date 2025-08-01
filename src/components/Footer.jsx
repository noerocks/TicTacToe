import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div>
        <p className="text-gray-300 p-2">
          {`${String.fromCharCode(
            0x00a9
          )} 2025 Noe Villamor. Built with ${String.fromCharCode(
            0x2764,
            0xfe0f
          )}`}{" "}
          using React
        </p>
      </div>
    );
  }
}

export default Footer;
