import React, { Component } from "react";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import GameSetup from "./gameSetup/gameSetup";
import Game from "./game/game";

import modelInstance from "./data/DixitModel";

import "./app.css";
import "./global.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Dixit online"
        };
    }

    render() {
        return (
            <BrowserRouter>
                <div className="routes">
                <Route
                    path='/:gameid'
                    render={({ match }) => <Game model={modelInstance} gameid={match.params.gameid} />}
                />
                <Route
                    exact path='/'
                    render={({ history }) => <GameSetup model={modelInstance} history={history} />}
                />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
