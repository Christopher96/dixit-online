import React, {Component} from "react";

import GameContext from "context/gameContext"
import ExpandButton from "./expandButton"

import './gameCard.css';

class GameCard extends Component{
    static contextType = GameContext

    constructor(props, context) {
        super(props)
    }

    selectCard = (key) => {
        let { game } = this.context


        switch(game.status) {
            case "PICKING":
                game.players[game.picker].pickedCard = key

                if(game.picker === game.teller && game.keyword == null) {
                    game.status = "KEYWORD"
                } else if(game.picker !== game.teller) {
                    game.status = "PICKING"
                    game.picker++
                } else {
                    game.status = "GUESSING"
                    game.guesser = game.teller+1
                }

                break
            case "GUESSING":
                game.players[game.guesser].guessedCard = key

                if(game.guesser !== game.teller){
                    game.status = "GUESSING"
                    game.guesser++
                }
                break
        }

        let numPlayers = game.players.length-1

        if(game.picker > numPlayers) game.picker = 0
        if(game.guesser > numPlayers) game.guesser = 0
        console.log(game.picker)

        this.context.update(game)
    }

    render() {
        let { index, card } = this.props
        return (
            <div onClick={() => this.selectCard(index)} className="gameCard">
                <ExpandButton full={card.full} thumb={card.thumbnail} alt={card.description} />
                <img src={card.thumbnail} />
            </div>
        );
    }
}

export default GameCard;
