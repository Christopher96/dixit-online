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
            numberPlayers: 3,
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
            .createGame(this.state.createGameName)
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


    render() {
        return (
            <div id='setup'>
                <h2>Create a new game:</h2>
                <div className='formEntry'>
                    <label htmlFor='gameName'>name of game:</label>
                    <input onChange={this.change} name='createGameName' type='text'/>
                </div>

                <div className='formEntry'>
                    <label htmlFor='numberPlayers'>number of players:</label>
                    <input onChange={this.change} value={this.state.numberPlayers} id='numberPlayers' name='numberPlayers' type='number' min='3' max='8'/>
                </div>

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
