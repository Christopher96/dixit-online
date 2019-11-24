import React, {Component} from "react";

import GameContext from "context/gameContext"
import moon from "../images/moon.png"

import './gameSetup.css';

class GameSetup extends Component{
    static contextType = GameContext

    constructor(props) {
        super(props);
        this.state = {
            showInstructions: false,
            createError: "",
            createGameName: "",
            continueError: "",
            continueGameName: "",
            players: ['', '', '']
        }
    }

    change = (e) => {
        this.setState({
            createError: "",
            continueError: ""
        });

        this.setState({ 
            [e.target.name]: e.target.value
        })
    }

    createGame = (e) => {
        e.preventDefault();
        if (this.state.createGameName.replace(/\s/g, '') === '') {
            this.setState({
                createError: "Name of game can't be empty."
            })
            return
        }
        for (let name of this.state.players) {
            if (name.replace(/\s/g, '') === '') {
                this.setState({
                    createError: "Player names can't be empty."
                });
                return;
            }
        }
        this.context.model
            .createGame(this.state.createGameName, this.state.players)
            .then(res => {
                if(!res.error) {
                    this.props.history.push(res.gameid)
                } else {
                    this.setState({
                        createError: res.error
                    })
                }
            })
    }

    continueGame = (e) => {
        if (this.state.continueGameName.replace(/\s/g, '') === '') {
            this.setState({
                continueError: "Name of game can't be empty."
            })
            return
        }
        this.context.model
            .getGame(this.state.continueGameName)
            .then(res => {
                if(!res.error) {
                    this.props.history.push(res.gameid)
                } else {
                    this.setState({
                        continueError: res.error
                    })
                }
            })
    }

    changePlayerName = (index) => (evt) => {
        evt.preventDefault()
        let name = evt.target.value
        let newPlayers = this.state.players.slice()
        newPlayers[index] = name
        this.setState({players: newPlayers})
    }


    addPlayer = (evt) => {
        evt.preventDefault()
        if (this.state.players.length < 6) {
            let newPlayers = this.state.players.slice()
            newPlayers.push('')
            this.setState({players: newPlayers})
        } else {
            this.setState({createError: "Can't add more than 6 players."})
        }
    }

    removePlayer = (index) => (evt) => {
        evt.preventDefault()
        if (this.state.players.length > 3) {
            let newPlayers = this.state.players.slice()
            newPlayers.splice(index, 1)
            this.setState({players: newPlayers})
        } else {
            this.setState({createError: "Can't have fewer than 3 players."})
        }
    }

    playerInfo = (name, index) => {
        let removeButton = (this.state.players.length > 3) ? <button id='removeButton' onClick={this.removePlayer(index)}>x</button> : '';

        return (
            <div className='formEntry playerName' key={index}>
                <label htmlFor={`player${index}`}>Player {index + 1}:</label>
                <input type='text' id={`player${index}`} value={name} key={index}
                    onChange={this.changePlayerName(index)}/>
                {removeButton}
            </div>
        )
    }

    playersInfos = () => {
        return this.state.players.map(this.playerInfo)
    }

    toggleInstructions = (state) => {
        this.setState({
            showInstructions: state
        })
    }


    render() {
        let addButton = (this.state.players.length < 6) ? <button id='addButton' onClick={this.addPlayer}>+ add player</button> : '';
        return (
            <div id='setup'>
                <div id='stars'>
                </div>
                <img id='moon' src={moon} alt=''/>
                { !this.state.showInstructions ? (
                    <div id='options'>
                        <p className='dixitTitle'>Dixit</p>
                        <div id='newGame'>
                            <p className='subTitle'>Create a new game</p>
                            <div className='formEntry'>
                                <label htmlFor='gameName'>Name of game:</label>
                                <input onChange={this.change} name='createGameName' type='text'/>
                            </div>

                            {this.playersInfos()}

                            <div className="formEntry">
                                {addButton}
                            </div>
                            <div className='formEntry'>
                                <button className='setupButton' onClick={this.createGame}>Create game</button>
                            </div>
                            <p className="error">{this.state.createError}</p>
                        </div>
                        <div id='existingGame'>
                            <p className='subTitle'>Continue existing game</p>
                            <div className='formEntry'>
                                <label htmlFor='gameName'>Name of game:</label>
                                <input onChange={this.change} name='continueGameName' type='text'/>
                            </div>
                            <div className='formEntry'>
                                <button className='setupButton' onClick={this.continueGame}>Continue game</button>
                            </div>
                            <p className="error">{this.state.continueError}</p>
                            <button className='howtoBtn setupButton' onClick={() => this.toggleInstructions(true)}>How to play the game ></button>
                        </div>
                    </div>
                ) : (
                    <div id="instructions">
                        <p className='dixitTitle'>Dixit</p>
                        <div className="instructionsTxt">
                            <span>The game is played in rounds. Every round is played as follows: Everybody adds cards to his hand to total of 6 cards. One storyteller is assigned. The storyteller picks a card from his hand and adds a line of description. The chosen card is placed face-down on the table and the line of description is made public. The other players all choose a card from their hand that best fits that same description. The cards are shuffled and placed face-up on the table. Now all the non-storyteller players chose the card which they think is the original card of the storyteller. One the count of three all the players reveal their choice. Now points are divided:</span>
                            <ul>
                                <li>If everybody correctly guessed the storyteller’s card or if nobody guessed the storyteller’s card, then the storyteller receives no points and all the other players receive 2 points.</li>
                                <li>Otherwise the storyteller receives 3 points and every player who correctly guessed the storyteller’s card receives 3 points.</li>
                                <li>Every non-storyteller player receives 1 point for every vote on their card.</li>
                            </ul>
                            <span>Therefore, as a storyteller you want to a description that is vague enough that not everybody guesses the card, but precise enough that at least one person guesses the card. The game continues for either a predefined number of rounds or until someone reaches a retrain score.</span>
                            <button className="setupButton" onClick={() => this.toggleInstructions(false)}>&lt; Go back</button>
                        </div>    
                    </div>
                )}
            </div>
        )
    }
}

export default GameSetup;
