import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./game.css";

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            game: null,
            status: "LOADING"
        };
    }

    componentDidMount() {
        this.getGame();
    }

    getGame = () => {
        this.props.model
            .getGame(this.props.gameid)
            .then((game) => this.setState({
                game,
                status: "LOADED"
            }))
            .catch(this.setState({
                status: "ERROR"
            }));
    }

    render() {
        this.content = null;

        switch(this.state.status) {
            case "LOADED":
                break;
        }

        return (
            <div className="Welcome">
                <p>{this.props.gameid}</p>
            </div>
        );
    }
}

export default Game;
