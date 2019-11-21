import React, {Component} from "react";
import Carousel, { Modal, ModalGateway } from 'react-images';

import GameContext from "context/gameContext"
import GameCard from "gameCard/gameCard"

import './gameField.css';

class GameField extends Component{
    static contextType = GameContext

    constructor(props, context) {
        super(props)

        context.toggleModal = this.toggleModal
        context.selectCard = this.selectCard
        context.game.status = "PICKING"

        this.state = {
            modalIsOpen: false,
            keyword: context.game.keyword
        }
    }

    toggleModal = (selectedIndex) => {
        this.setState(state => ({ 
            modalIsOpen: !state.modalIsOpen,
            selectedIndex
        }))
    }

    selectCard = (card) => {
        let { game } = this.context

        switch(game.status) {
            case "KEYWORD":
            case "GAMEOVER":
                return
            case "PICKING":
                game.players[game.picker].pickedCard = card

                if(game.keyword == null) {
                    game.status = "KEYWORD"
                } else {
                    this.next("picker")

                    if(game.picker === game.teller) {
                        game.status = "GUESSING"
                    } 
                } 
                break
            case "GUESSING":
                game.players[game.guesser].guessedCard = card

                this.next("guesser")

                if(game.guesser === game.teller) {
                    game.status = "GAMEOVER"
                    this.distributeScore()
                }                
                break
        }

        this.context.updateGame(game)
    }

    changeKeyword = () => {
        let { game } = this.context

        game.keyword = this.state.keyword
        game.status = "PICKING"
        this.next("picker")

        this.context.updateGame(game)
    }

    distributeScore = () => {
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

    generateCards = (cards) => {
        if(!Array.isArray(cards))
            cards = [cards]

        console.log(cards)

        return {
            images: cards.map(card => {
                return {
                    src: card.full,
                    caption: card.description
                }
            }),
            elems: <div className="gameCards">
                {cards.map((card, i) => <GameCard key={i} index={i} card={card} />)}
            </div>
        }
    }

    set = (type, val) => {
        let { game } = this.context
        let numPlayers = game.players.length-1
        game[type] = val
        if(game[type] > numPlayers) 
            game[type] = 0

        this.context.updateGame(game)
    }

    next = (type) => {
        this.set(type, this.context.game[type]+1)
    }

    newRound = () => {
        this.next("teller")

        let { game } = this.context
        game.picker = game.teller
        this.set("guesser", game.teller+1)

        game.keyword = null
        game.status = "PICKING"

        this.context.updateGame(game)
    }

    render() {
        let { game } = this.context
        let teller = game.players[game.teller]
        let picker = game.players[game.picker]
        let guesser = game.players[game.guesser]

        let status = null
        let content = null
        let cards = null

        let keyword = (teller !== picker) && <p>The keyword is "{game.keyword}"</p>

            switch(game.status) {
                case "PICKING":
                    cards = this.generateCards(picker.cards)
                    content = <div>
                        <p>{picker.name}, which card to you want to pick?</p>
                        {cards.elems}
                    </div>
                        break
                case "KEYWORD":
                        cards = this.generateCards(picker.pickedCard)
                    content = <div>
                        <p>What is your keyword?</p>
                        <input type="text" onChange={e => this.setState({ keyword: e.target.value })} />
                        <button onClick={this.changeKeyword}>ok</button>
                        {cards.elems}
                    </div>
                        break
                case "GUESSING":
                        cards = this.generateCards(game.players.map(player => player.pickedCard))
                    content = <div>
                        <p>{guesser.name}, which card has {teller.name} picked?</p>
                        {cards.elems}
                    </div>
                        break

                case "GAMEOVER":
                        cards = this.generateCards(teller.pickedCard)
                    content = <div>
                        <div>
                            <p>Game over</p>
                            <p>{teller.name} picked this card.</p>
                        </div>
                        {cards.elems}
                        <button onClick={this.newRound}>New round</button>
                    </div>
                        break
                default:
                    content = <div>
                        <p>Something went wrong.</p>
                    </div>
                        break
            }

        const { modalIsOpen, selectedIndex } = this.state;

        return(            
            <div id="gameField">
                {status}
                {keyword}
                {content}
                <ModalGateway>
                    {modalIsOpen ? (
                        <Modal onClose={this.toggleModal}>
                            <Carousel 
                                views={cards.images}
                                currentIndex={selectedIndex} 
                            />
                        </Modal>
                    ) : null}
                </ModalGateway>
            </div>
        ) 
    }
}

export default GameField;
