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

        this.state = {
            modalIsOpen: false,
            cardsHidden: true,
            keyword: context.game.keyword
        }
    }

    componentDidMount() {
        this.startRound()
    }


    toggleModal = (selectedIndex) => {
        this.setState(state => ({ 
            modalIsOpen: !state.modalIsOpen,
            selectedIndex
        }))
    }

    selectCard = (card) => {
        if(this.state.cardsHidden) {
            this.setState({
                cardsHidden: false
            })
            return
        }

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
                    this.setState({ cardsHidden: true })
                    setTimeout(() => {
                        this.next("picker")
                        if(game.picker === game.teller) {
                            game.status = "GUESSING"
                            this.setState({ cardsHidden: false })
                            this.context.updateGame(game)
                        }                     
                    }, 500)
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
        this.setState({ cardsHidden: true })

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
        return array;
    }

    generateCards = (cards) => {
        if(!Array.isArray(cards))
            cards = [cards]

        return {
            images: cards.map(card => {
                return {
                    src: card.full,
                    caption: card.description
                }
            }),
            elems: <div className="gameCards">
                {cards.map((card, i) => <GameCard key={i} index={i} card={card} hidden={this.state.cardsHidden} />)}
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

    saveGame = () => {
        let { game } = this.context

        this.setState({
            status: "SAVING"
        })

        this.context.model
            .saveGame(game)
            .then(res => {
                if(!res.error) {
                    this.context.updateGame(res)
                    this.startRound()
                    this.setState({
                        status: null
                    })
                } else {
                    this.setState({
                        error: res.error,
                        status: "ERROR"
                    })
                }
            })
    }
    newRound = () => {
        this.setState({
            cardsHidden: true
        })
        this.next("teller")
        this.saveGame()
    }

    startRound = () => {
        let { game } = this.context

        this.set("picker", game.teller)
        this.set("guesser", game.teller+1)

        game.keyword = null
        game.status = "PICKING"

        const colors = [
            "springgreen",
            "crimson",
            "deepskyblue",
            "indigo",
            "orangered",
            "magenta",
        ]

        game.players.forEach((player, i) => {
            player.name = <span style={{color: colors[i]}} className="playerName">{player.name}</span>
        })

        this.context.updateGame(game)
    }

    toggleCards = () => {
        this.setState({
            cardsHidden: !this.state.cardsHidden
        })
    }

    render() {
        if(this.state.status === "SAVING") {
            return (
                <div id="gameField">
                    <div class="loader large"></div>
                </div>
            )
        }

        const { game } = this.context
        const teller = game.players[game.teller]
        const picker = game.players[game.picker]
        const guesser = game.players[game.guesser]

        const { modalIsOpen, selectedIndex, cardsHidden } = this.state;

        let keyword = (game.keyword == null) ? null : <p>The keyword is "{game.keyword}"</p>

            let status = null
        let content = null
        let cards = null

        switch(game.status) {
            case "PICKING":
                cards = this.generateCards(picker.cards)
                content = <div>
                    <p>{picker.name}, which card to you want to pick?</p>
                    {cards.elems}
                    <button onClick={this.toggleCards}>{(cardsHidden) ? "Show cards" : "Hide cards"}</button>
                </div>
                    break
            case "KEYWORD":
                    keyword = null
                cards = this.generateCards(picker.pickedCard)
                content = <div>
                    <p>What is your keyword?</p>
                    <input type="text" onChange={e => this.setState({ keyword: e.target.value })} />
                    <button onClick={this.changeKeyword}>ok</button>
                    {cards.elems}
                </div>
                    break
            case "GUESSING":
                    let playerCards = this.shuffleArray(game.players.map(player => player.pickedCard))
                cards = this.generateCards(playerCards)
                content = <div>
                    <p>{guesser.name}, which card has {teller.name} picked?</p>
                    {cards.elems}
                </div>
                    break

            case "GAMEOVER":
                    keyword = null
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
            case "ERROR":
                content = <div>
                    <p>{this.state.error}</p>
                </div>
                    break
        }

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
