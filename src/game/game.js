import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./game.css";

class Game extends Component {
  render() {
    return (
      <div className="Welcome">
        <p>Welcome to the dinner planner React Startup code!</p>

        <Link to="/search">
          <button>Start planning</button>
        </Link>
      </div>
    );
  }
}

export default Game;
