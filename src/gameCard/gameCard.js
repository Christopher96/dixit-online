import React, {Component} from "react";

import GameContext from "context/gameContext"
import ExpandButton from "./expandButton"

import './gameCard.css';

class GameCard extends Component{
    static contextType = GameContext

    constructor(props, context) {
        super(props)
    }

    selectCard = () => {
        this.context.selectCard(this.props.card)
    }

    render() {
        let { card, index } = this.props

        return (
            <div className="gameCard">
                <ExpandButton index={index} />
                <img onClick={this.selectCard} src={card.thumbnail} alt={card.description} />
            </div>
        );
    }
}

export default GameCard;
