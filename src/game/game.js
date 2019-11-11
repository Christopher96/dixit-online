import React, { Component } from "react"
import { Link } from "react-router-dom"

import "./game.css"

class Game extends Component {
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
        this.props.model
            .getGame(this.props.gameid)
            .then(res => {
                if(!res.error) {
                    this.setState({
                        game: res,
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

        let { game } = this.state;

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
