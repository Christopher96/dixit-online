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

    selectCard = (card) => {
        let { game } = this.context

        let numPlayers = game.players.length-1

        switch(game.status) {
            case "KEYWORD":
            case "GAMEOVER":
                return
            case "PICKING":
                game.players[game.picker].pickedCard = card

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
                game.players[game.guesser].guessedCard = card

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
        let teller = game.players[game.teller]
        let tellerCard = teller.pickedCard

        game.players.forEach(player => {
            let playerCard = player.guessedCard
            if(player !== teller && playerCard == tellerCard) {
                player.correct = true
                correctGuesses++
            }
        })

        // All the players guessed the tellers card or no one did
        if(correctGuesses == game.players.length-1 || correctGuesses == 0) {
            game.players.forEach(player => {
                if(player !== teller) {
                    player.score += 2
                }
            })
            // Not all but some guessed the correct card
        } else {
            game.players[game.teller].score += 3
            game.players.forEach(player => {
                if(player.correct) {
                    player.score += 3
                }
            })

            // Some were players were incorrect
            game.players.forEach(player => {
                if(!player.correct) {

                    // Find the the player that has the incorrect guessed card
                    game.players.forEach(otherPlayer => {
                        if(otherPlayer !== teller && otherPlayer.pickedCard === player.guessedCard) {
                            otherPlayer.score += 1
                        }
                    })
                }
            })
        }


    }

    shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    pickedCards = () => {
        let { game } = this.context

        let cards = game.players.map(player => {
            return player.pickedCard
        })

        // Shuffle so we don't know which one is the tellers card
        this.shuffleArray(cards)

        return this.cardsWrapper(cards)
    }

    cardsWrapper = (cards) => {
        return <div className="gameCards">
            <SRLWrapper>
                {cards.map((card, i) => <GameCard key={i} card={card} />)}
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
                        content = this.cardsWrapper([picker.pickedCard])
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
                        content = this.cardsWrapper([teller.pickedCard])
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
