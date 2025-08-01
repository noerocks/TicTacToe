import React from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import Footer from "./components/Footer";

class App extends React.Component {
  render() {
    return (
      <div className="min-h-screen flex flex-col gap-5 justify-between items-center bg-gray-800">
        <Header />
        <Game />
        <Footer />
      </div>
    );
  }
}

export default App;
