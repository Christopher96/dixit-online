import React, { Component } from "react"
import { Link } from "react-router-dom"

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
