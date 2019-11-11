import React, {Component} from "react";
import './gameSetup.css';

class GameSetup extends Component{
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
        this.props.model
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
        this.props.model
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
        if (this.state.players.length < 8) {
            let newPlayers = this.state.players.slice()
            newPlayers.push('')
            this.setState({players: newPlayers})
        } else {
            this.setState({createError: "Can't add more than 8 players."})
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
        let removeButton = (this.state.players.length > 3) ? <button onClick={this.removePlayer(index)}>x</button> : '';

        return (
            <div className='formEntry' key={index}>
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
        let addButton = (this.state.players.length < 8) ? <button onClick={this.addPlayer}>+ add player</button> : '';
        return (
            <div id='setup'>
                <h2>Create a new game:</h2>
                <div className='formEntry'>
                    <label htmlFor='gameName'>name of game:</label>
                    <input onChange={this.change} name='createGameName' type='text'/>
                </div>

                {this.playersInfos()}
                {addButton}

                <div className='formEntry'>
                    <label htmlFor='theme'>theme:</label>
                    <select id='theme' name='theme'>
                        <option value='landscapes'>landscapes</option>
                        <option value='animals'>animals</option>
                    </select>
                </div>

                <div className='formEntry'>
                    <button onClick={this.createGame}>Create game</button>
                </div>
                <p className="error">{this.state.createError}</p>
                <h2>Continue existing game</h2>
                <div className='formEntry'>
                    <label htmlFor='gameName'>name of game:</label>
                    <input onChange={this.change} name='continueGameName' type='text'/>
                </div>
                <div className='formEntry'>
                    <button onClick={this.continueGame}>Continue game</button>
                </div>
                <p className="error">{this.state.continueError}</p>
            </div>
        )
    }
}

export default GameSetup;
