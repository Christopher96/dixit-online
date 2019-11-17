import React, {Component} from "react";

import { GameContext } from "context/gameContext"

import './gameCard.css';

class GameField extends Component{
    static contextType = GameContext

    constructor(props, context) {
        super(props);
    }

    render() {
        let { card } = this.props

        return (
            <div className="gameCard">
                <img src={card.thumbnail} alt={card.description} />
            </div>
        )
    }
}

export default GameField;
