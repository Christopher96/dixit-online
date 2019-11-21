import React, {Component} from "react"

import GameContext from "context/gameContext"

class ExpandButton extends Component{
    static contextType = GameContext

    render() {
        let { index } = this.props

        return (
            <div onClick={() => this.context.toggleModal(index)} className="expandButton">
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" height="512" viewBox="0 0 509.938 509.938" width="512"><path d="m493.808 0h-198.218c-8.836 0-16 7.163-16 16s7.164 16 16 16h159.606l-211.544 211.658c-6.247 6.25-6.244 16.381.006 22.627 6.248 6.246 16.38 6.246 22.627-.006l211.523-211.637v159.69c0 8.837 7.164 16 16 16s16-7.163 16-16v-198.332c0-8.837-7.163-16-16-16z"/><path d="m493.808 268.63c-8.836 0-16 7.163-16 16v193.308h-445.679v-445.938h193.195c8.836 0 16-7.163 16-16s-7.164-16-16-16h-209.195c-8.836 0-16 7.163-16 16v477.938c0 8.837 7.164 16 16 16h477.679c8.836 0 16-7.163 16-16v-209.308c0-8.837-7.163-16-16-16z"/></svg>
            </div>
        )
    }
}

export default ExpandButton;
