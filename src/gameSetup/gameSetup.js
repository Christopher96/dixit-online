import React, {Component} from "react";

import { GameContext } from "context/gameContext"

import './gameSetup.css';
import woodenBoard from "../images/wooden_board.png";

class GameSetup extends Component{
    static contextType = GameContext

    constructor(props) {
        super(props);

        this.resetState();
    }

    resetState = () => {
        this.state = {
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


    render() {
        let addButton = (this.state.players.length < 6) ? <button id='addButton' onClick={this.addPlayer}>+ add player</button> : '';
        return (
            <div id='setup'>
                <img src={woodenBoard} alt="wooden board" id='board'/>
                <div id='options'>
                    <p id='title'>Dixit</p>
                    <div id='newGame'>
                        <p className='subTitle'>Create a new game</p>
                        <div className='formEntry'>
                            <label htmlFor='gameName'>Name of game:</label>
                            <input onChange={this.change} name='createGameName' type='text'/>
                        </div>

                        {this.playersInfos()}

                        <div id='themeSelector' className='formEntry'>
                            <label htmlFor='theme'>theme:</label>
                            <select id='theme' name='theme'>
                                <option value='landscapes'>landscapes</option>
                                <option value='animals'>animals</option>

                            </select>
                            <span/>
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
                    </div>
                </div>
            </div>
        )
    }
}

export default GameSetup;
