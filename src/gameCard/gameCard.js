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
        //<ExpandButton full={card.full} thumb={card.thumbnail} alt={card.description} />
        let { card } = this.props

        let showBtn = true
        let btnTxt = null
        switch(this.context.game.status) {
            case "PICKING":
                btnTxt = "Pick"
                break
            case "GUESSING":
                btnTxt = "Guess"
                break
            case "KEYWORD":
                showBtn = false
                break
        }

        return (
            <div>
                <a href={card.full} data-attribute="SRL" className="gameCard">
                    <img src={card.thumbnail} alt={card.description} />
                </a>
                {showBtn && <button onClick={() => this.selectCard()}>{btnTxt}</button>}
            </div>
        );
    }
}

export default GameCard;
