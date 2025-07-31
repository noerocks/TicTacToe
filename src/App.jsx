import React from "react";

class App extends React.Component {
  render() {
    console.log("test");
    return (
      <div className="h-screen flex flex-col justify-center items-center gap-2 bg-gray-800 text-white">
        <h1 className="text-6xl font-bold">Tic Tac Toe</h1>
        <p className="text-2xl">My first React project⚛️</p>
      </div>
    );
  }
}

export default App;
