// Gets express router
const express = require('express')
const router = express.Router()

const Game = require('../models/Game')
const Player = require('../models/Player')

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

router.post('/create', (req, res, next) => {
    let { gameid, players } = req.body

    let game = Game.findOne({ gameid })
        .then((game) => {
            if(game != null) {
                return res.status(403).send(`Game with ID '${gameid}' already exists.`)
            } else {
                let playerObjects = players.map(name => new Player({name}));
                let game = new Game({ gameid })
                game.players = playerObjects

                game.save(function (err) {
                    if (err) {
                        return res.status(500).send(err)
                    } else {
                        return res.status(200).json(game)
                    }
                })
            }
        })
        .catch((e) => {
            return res.status(500).send(e)
        })
})

router.post('/save', (req, res, next) => {
    let { game } = req.body
    let { _id } = game

    Game.updateOne({ _id: doc._id }, { $set: game })
        .then((game) => {
            if(game != null) {
                return res.status(403).send(`Game with ID '${gameid}' already exists.`)
            } else {
                let playerObjects = players.map(name => new Player({name}));
                let game = new Game({ gameid })
                game.players = playerObjects

                game.save(function (err) {
                    if (err) {
                        return res.status(500).send(err)
                    } else {
                        return res.status(200).json(game)
                    }
                })
            }
        })
        .catch((e) => {
            return res.status(500).send(e)
        })
})

module.exports = router
