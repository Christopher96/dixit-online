import React, { Component } from "react";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import modelInstance from "data/DixitModel"
import { GameProvider } from "context/gameContext"

import GameInst from "gameInst/gameInst";
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

        this.state = {
            model: modelInstance,
            game: null,
            updateGame: (game) => {
                const colors = [
                    "springgreen",
                    "crimson",
                    "deepskyblue",
                    "indigo",
                    "orangered",
                    "magenta",
                ]

                game.players.forEach((player, i) => {
                    player.name = <span style={{color: colors[i]}} className="playerName">{player.name}</span>
                })
                this.setState({ game })
            }
        }
    }

    render() {

        return (
            <GameProvider value={this.state}>
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
