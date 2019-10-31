import React, {Component} from "react";
import {Route} from "react-router-dom";
import Game from "./game/game";
import "./app.css";
import "./global.css";
import { BrowserRouter } from "react-router-dom";
import GameSetup from "./gameSetup/gameSetup";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Dixit online"
        };
    }

    render() {
        return (
            <BrowserRouter>
                <div id='routers'>
                    <Route
                        path='/:username'
                        component={Game}
                    />
                    <Route
                        exact path='/'
                        component={GameSetup}
                    />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
