// Gets express router
const express = require('express')
const router = express.Router()

const Game = require('../models/Game')
const Player = require('../models/Player')

const { get_cards } = require('./images')

router.get('/:gameid', (req, res, next) => {
    let { gameid } = req.params

    Game.findOne({ gameid })
        .then((game) => {
            if(game != null) {
                return res.status(200).json(game)
            } else {
                return res.status(404).send(`Game with ID '${gameid}' was not found.`)
            }
        })
        .catch((e) => {
            return res.status(500).send(e)
        })
})



assign_cards = (playerObjects) => {
    let numPlayers = playerObjects.length
    let cardsPerPlayer = 5

    return get_cards(numPlayers*cardsPerPlayer).then(cards => {
        let cardIndex = 0

        playerObjects.forEach(player => {
            let playerCards = cards.slice(cardIndex, cardIndex+cardsPerPlayer)
            cardIndex += cardsPerPlayer;
            player.cards = playerCards
        })

        return playerObjects
    })
}

save_game = (req, res, next) => {
    req.game.save((err, game) => {
        if (err) {
            return res.status(500).send(err)
        } else {
            return res.status(200).json(game)
        }
    })
}

router.post('/create', (req, res, next) => {
    let { gameid, players } = req.body

    let game = Game.findOne({ gameid })
        .then((game) => {
            if(game != null) {
                return res.status(403).send(`Game with ID '${gameid}' already exists.`)
            } else {
                let playerObjects = players.map(name => new Player({ name }))

                assign_cards(playerObjects).then(playerObjects => {

                    req.game = new Game({ gameid, players: playerObjects })
                    next()
                }).catch(e => {
                    return res.sendStatus(500)
                })
            }
        })
        .catch((e) => {
            return res.sendStatus(500)
        })
}, save_game)

router.post('/save', (req, res, next) => {
    let updatedGame = req.body.game
    let { _id } = updatedGame

    Game.findOne({ _id }, (err, game) => {
        if (err) {
            console.log(err)
            return res.sendStatus(500)
        } else {
            assign_cards(game.players).then(playerObjects => {
                game.teller = updatedGame.teller
                game.players.forEach((player, i) => {
                    player.score = updatedGame.players[i].score
                })

                req.game = game
                next()
            })
        }
    })
}, save_game)

module.exports = router
