import React, {Component} from "react";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox"

import GameContext from "context/gameContext"
import GameCard from "gameCard/gameCard"

import './gameField.css';

class GameField extends Component{
    static contextType = GameContext

    constructor(props, context) {
        super(props)

        context.selectCard = this.selectCard

        this.state = {
            keyword: context.game.keyword
        }
    }

    changeKeyword = () => {
        let { game } = this.context

        game.keyword = this.state.keyword
        game.status = "PICKING"
        game.picker++

        this.context.updateGame(game)
    }

    selectCard = (key) => {
        let { game } = this.context

        let numPlayers = game.players.length-1

        switch(game.status) {
            case "KEYWORD":
            case "GAMEOVER":
                return
            case "PICKING":
                game.players[game.picker].pickedCard = key

                if(game.keyword == null) {
                    game.status = "KEYWORD"
                } else {
                    game.picker++
                    if(game.picker > numPlayers) game.picker = 0

                    if(game.picker === game.teller) {
                        game.status = "GUESSING"
                        game.guesser = game.teller+1
                        if(game.guesser > numPlayers) game.guesser = 0
                    } 
                } 
                break
            case "GUESSING":
                game.players[game.guesser].guessedCard = key

                game.guesser++
                if(game.guesser > numPlayers) game.guesser = 0

                if(game.guesser === game.teller) {
                    game.status = "GAMEOVER"
                    this.distributePoints()
                }                
                break
        }

        this.context.updateGame(game)
    }


    distributePoints = () => {
        let { game } = this.context

        let correctGuesses = 0
        let tellerCard = game.teller.pickedCard

        game.players.forEach((player, i) => {
            if(i !== game.teller && player.pickedCard == tellerCard) {
                player.correct = true
                correctGuesses++
            }
        })

        if(correctGuesses == game.players.length-1 || correctGuesses == 0) {
            game.players.forEach(player => {
                if(player != game.teller) {
                    player.score += 2
                }
            })
        } else {
            game.teller.score += 3
            game.players.forEach(player => {
                if(player.correct) {
                    player.score += 3
                }
            })
        }

        game.players.forEach(player => {
            if(!player.correct) {
                game.players[player.guessedCard].score += 1
            }
        })
    }

    pickedCards = () => {
        let { game } = this.context

        let cards = game.players.map((player, i) => {
            return player.cards[player.pickedCard]
        })

        return this.cardsWrapper(cards)
    }

    cardsWrapper = (cards) => {
        return <div className="gameCards">
            <SRLWrapper>
                {cards.map((card, i) => <GameCard key={i} index={i} card={card} />)}
            </SRLWrapper>
        </div>
    }

    render() {
        let { game } = this.context
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
                        content = this.cardsWrapper(picker.cards)
                    break
                case "KEYWORD":
                        status = <div>
                            <p>What is your keyword?</p>
                            <input type="text" onChange={e => this.setState({ keyword: e.target.value })} />
                            <button onClick={this.changeKeyword}>ok</button>
                        </div>
                        content = this.cardsWrapper([picker.cards[picker.pickedCard]])
                    break
                case "GUESSING":
                        status = <div>
                            <p>{guesser.name}, which card has {teller.name} picked?</p>
                        </div>
                        content = this.pickedCards()
                    break

                case "GAMEOVER":
                        status = <div>
                            <p>Game over</p>
                            <p>{teller.name} picked this card.</p>
                        </div>
                        content = this.cardsWrapper([teller.cards[teller.pickedCard]])
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
