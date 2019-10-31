import React, {Component} from "react";
import './gameSetup.css';

class GameSetup extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <GameSetupPresentation/>
        );
    }
}

class GameSetupPresentation extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='setup'>
                <h2>Create a new game:</h2>
                <form>
                    <div className='formEntry'>
                        <label htmlFor='gameName'>name of game:</label>
                        <input id='gameName' name='gameName' type='text'/>
                    </div>

                    <div className='formEntry'>
                        <label htmlFor='numberPlayers'>number of players:</label>
                        <input id='numberPlayers' name='numberPlayers' type='number' min='3' max='8' defaultValue='3'/>
                    </div>

                    <div className='formEntry'>
                        <label htmlFor='theme'>theme:</label>
                        <select id='theme' name='theme'>
                            <option value='landscapes'>landscapes</option>
                            <option value='animals'>animals</option>
                        </select>
                    </div>

                    <div className='formEntry'>
                        <input type='submit' value='Create game'/>
                    </div>
                </form>
                <h2>Continue existing game</h2>
                <form>
                    <div className='formEntry'>
                        <label htmlFor='gameName'>name of game:</label>
                        <input id='gameName' name='gameName' type='text'/>
                    </div>
                    <div className='formEntry'>
                        <input type='submit' value='Continue game'/>
                    </div>
                </form>
            </div>
        )
    }
}

export default GameSetup;