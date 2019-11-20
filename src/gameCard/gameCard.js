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
        let { card } = this.props
        return (
            <div onClick={() => this.selectCard()} className="gameCard">
                <ExpandButton full={card.full} thumb={card.thumbnail} alt={card.description} />
                <img src={card.thumbnail} />
            </div>
        );
    }
}

export default GameCard;
