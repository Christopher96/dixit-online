import React, { Component } from "react";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import modelInstance from "data/DixitModel"
import { GameProvider } from "context/gameContext"

import GameSetup from "gameSetup/gameSetup";
import Game from "game/game";

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
        let context ={
            model: modelInstance,
            game: null,
            update: () => {}
        }

        return (
            <GameProvider value={context}>
                <BrowserRouter>
                    <div id="routes">
                        <Route
                            path='/:gameid'
                            render={({ match }) => <Game gameid={match.params.gameid} />}
                        />
                        <Route
                            exact path='/'
                            render={({ history }) => <GameSetup history={history} />}
                        />
                    </div>
                </BrowserRouter>
            </GameProvider>
        );
    }
}

export default App;
