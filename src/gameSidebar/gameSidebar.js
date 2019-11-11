import React, {Component} from "react";

import { GameContext } from "context/gameContext"

import './gameSidebar.css';

class GameSidebar extends Component{
    static contextType = GameContext

    constructor(props) {
        super(props);

    }
    render() {
        let { game } = this.context;

        let players = game.players.map((player, i) => {
            let isCurrent = game.currentPicker == i;
            return <tr key={i} className={isCurrent ? 'current' : ''}>
                <td>{player.name}</td>
                <td>{player.score}</td>
            </tr>
        })
        return(
            <div id="gameSidebar">
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
            </div>
        )
    }
}

export default GameSidebar;
