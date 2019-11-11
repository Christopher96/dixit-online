import React, { Component } from "react"

import { GameContext } from "context/gameContext"
import GameSidebar from "gameSidebar/gameSidebar"
import GameField from "gameField/gameField"

import "./game.css"

class Game extends Component {
    static contextType = GameContext

    constructor(props) {
        super(props)

        this.state = {
            game: null,
            status: "LOADING"
        }
    }

    componentDidMount() {
        this.getGame()
    }

    getGame = () => {
        this.context.model
            .getGame(this.props.gameid)
            .then(res => {
                if(!res.error) {
                    this.context.game = res
                    this.setState({
                        status: "LOADED"
                    })
                } else {
                    this.setState({
                        error: res.error,
                        status: "ERROR"
                    })
                }
            })
    }

    render() {
        let content = null

        switch(this.state.status) {
            case "LOADED":
                let players = game.players.map((player, i) => {
                    let isCurrent = game.currentPlayer == i;
                    return (
                        <tr key={i} className={isCurrent ? 'current' : ''}>
                            <td>{player.name}</td>
                            <td>{player.score}</td>
                        </tr>
                    )
                })
                content = 
                    <div id="game">
                        <p className="gameName">{this.props.gameid}</p>
                        <div className="sidebar">
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
                        <div className="field">
                        </div>
                let { game } = this.context

                content = 
                    <div id="game">
                        <p className="gameName">{this.props.gameid}</p>
                        <GameSidebar />
                        <GameField />
                    </div>
                break
            case "LOADING":
                content = 
                    <div className="center">
                        <div className="loader"></div> 
                    </div>
                break
            case "ERROR":
                content = 
                    <div className="center">
                        <p className="notFound">404: {this.state.error}</p>
                    </div>
                break
        }

        return content
    }
}

export default Game
