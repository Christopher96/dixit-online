import React, { Component } from "react"

import GameContext from "context/gameContext"
import GameSidebar from "gameSidebar/gameSidebar"
import GameField from "gameField/gameField"

import "./game.css"

class Game extends Component {
    static contextType = GameContext

    constructor(props, context) {
        super(props)

        this.state = {
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
        let { game } = this.context

        let content = null

        switch(this.state.status) {
            case "LOADED":
                content = 
                    <div id="game">
                        <div id='gameSidebarContainer'>
                            <GameSidebar/>
                        </div>
                        <div id='gameFieldContainer'>
                            <GameField/>
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
            default:
                content =
                    <div className="center">
                        <p>Something went wrong.</p>
                    </div>
        }

        return content
    }
}

export default Game
