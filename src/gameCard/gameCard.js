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
        let { card, index, hidden } = this.props

        return (
            <div className={"gameCard " + ((hidden) ? "flipped" : "")}>
                <div className="gameCard-inner">
                    <div className="gameCard-front">
                        <img onClick={this.selectCard} src={card.thumbnail} alt={card.description} />
                        <ExpandButton index={index} />
                    </div>
                    <div onClick={this.selectCard} className="gameCard-back">
                        <p className="dixitTitle">Dixit</p>
                    </div>
                </div>
            </div> 
        );
    }
}

export default GameCard;
