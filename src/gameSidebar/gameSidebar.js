import React, {Component} from "react";
import {Link} from "react-router-dom";

import GameContext from "context/gameContext"

import './gameSidebar.css';

class GameSidebar extends Component{
    static contextType = GameContext

    constructor(props, context) {
        super(props)
    }

    render() {
        let { game } = this.context;

        let players = game.players.map((player, i) => {
            let isCurrent = false;

            if(game.status === "GUESSING") {
                isCurrent = game.guesser === i;
            } else if(game.status === "PICKING"){
                isCurrent = game.picker === i;
            }

            return <tr key={i}>
                <td>{(isCurrent) ? ">": ""} {player.name}</td>
                <td>{player.score}</td>
            </tr>
        })

        const teller = game.players[game.teller]

        return(
            <div id="gameSidebar">
                <Link to="/">
                    <button>&lt; Go back</button>
                </Link>
                <h1 id='gameTitle'>{game.gameid}</h1>
                <table className="players">
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players}
                    </tbody>
                </table>
                <p className="storyTeller">{teller.name} is the storyteller of this round</p>
            </div>
        )
    }
}

export default GameSidebar;
