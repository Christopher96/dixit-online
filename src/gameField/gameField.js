import React, {Component} from "react";

import { GameContext } from "context/gameContext"

import Card from "gameCard/gameCard"

import './gameField.css';

class GameField extends Component{
    static contextType = GameContext

    constructor(props, context) {
        super(props);

        this.state = {
            status: "PICKING",
            keyword: context.game.keyword
        }
    }

    changeKeyword = () => {
        this.context.game.keyword = this.state.keyword
    }

    generateCards = (player) => {
        return player.cards.map(card => <Card card={card} />)
    }

    render() {
        let { game } = this.context;
        let teller = game.players[game.teller]
        let picker = game.players[game.picker]
        let guesser = game.players[game.guesser]

        let status = null
        let cards = null


        switch(this.state.status) {
            case "PICKING":
                cards = this.generateCards(picker)
                status = <div>
                    <p>{picker.name}, which card to you want to pick?</p>
                </div>
                break
            case "KEYWORD":
                    status = <div>
                        <p>What is your keyword?</p>
                        <input type="text" onChange={e => this.setState({ keyword: e.target.value })} />
                        <button onClick={this.changeKeyword}>ok</button>
                    </div>
                break
            case "CHOOSING":
                    status = <div>
                        <p>{guesser.name}, which card has ${teller.name} chosen?</p>
                        <p>The keyword is {game.keyword}</p>
                    </div>
                break
            default:
                    status = <div>
                        <p>Something went wrong.</p>
                    </div>
                break
        }
        return(            
            <div id="gameField">
                {status}
                <div id="gameCards">
                    {cards}
                </div>
            </div>
        ) 
    }
}

export default GameField;
