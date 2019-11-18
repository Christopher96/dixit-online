import React, {Component} from "react";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox"

import GameContext from "context/gameContext"
import GameCard from "gameCard/gameCard"

import './gameField.css';

class GameField extends Component{
    static contextType = GameContext

    constructor(props, context) {
        super(props)

        context.update = game => this.setState({ game })

        this.state = {
            game: context.game,
            keyword: context.game.keyword
        }
    }

    changeKeyword = () => {
        let { game } = this.context

        game.keyword = this.state.keyword
        game.status = "PICKING"
        game.picker++

        this.context.update(game)
    }

    playerCards = (player) => {
        let cards = player.cards.map((card, i) => <GameCard key={i} index={i} card={card} />)
        return this.cardsWrapper(cards)
    }

    pickedCards = () => {
        let { game } = this.context

        let cards = game.players.map((player, i) => {
            let card = player.cards[player.pickedCard]
            return <GameCard key={i} index={i} card={card} />
        })
        return this.cardsWrapper(cards)
    }

    cardsWrapper = (cards) => {
        return <div className="gameCards">
            <SRLWrapper>
                {cards}
            </SRLWrapper>
        </div>
    }

    render() {
        let { game } = this.state
        let teller = game.players[game.teller]
        let picker = game.players[game.picker]
        let guesser = game.players[game.guesser]

        let status = null
        let content = null

        let keyword = (teller !== picker) && <p>The keyword is "{game.keyword}"</p>

        switch(game.status) {
            case "PICKING":
                status = <div>
                    <p>{picker.name}, which card to you want to pick?</p>
                </div>
                    content = this.playerCards(picker)
                break
            case "KEYWORD":
                    status = <div>
                        <p>What is your keyword?</p>
                        <input type="text" onChange={e => this.setState({ keyword: e.target.value })} />
                        <button onClick={this.changeKeyword}>ok</button>
                    </div>
                    content = <SRLWrapper>
                        <GameCard card={picker.cards[picker.pickedCard]} />
                    </SRLWrapper>
                    break
            case "GUESSING":
                    status = <div>
                        <p>{guesser.name}, which card has {teller.name} picked?</p>
                    </div>
                    content = this.pickedCards()
                    break

            case "GAMEOVER":

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
                {keyword}
                <SimpleReactLightbox>
                    {content}
                </SimpleReactLightbox>
            </div>
        ) 
    }
}

export default GameField;
