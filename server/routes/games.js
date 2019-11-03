// Gets express router
const express = require('express')
const router = express.Router()

const Game = require('../models/Game')

router.get('/:gameid', (req, res, next) => {
    let { gameid } = req.params

    Game.findOne({ gameid })
        .then((game) => {
            if(game != null)
                return res.status(200).json(game)
        })
        .finally(() => {
            return res.status(404).send(`Game with ID '${gameid}' was not found.`)
        })
        .catch((e) => res.status(500).send(e))
})

router.post('/create', (req, res, next) => {
    let { gameid } = req.body

    let game = Game.findOne({ gameid })
        .then((game) => {
            if(game != null)
                return res.status(403).send(`Game with ID '${gameid}' already exists.`)
        })
        .finally(() => {
            let game = new Game({ gameid })
            game.save(function (err) {
                if (err) return res.status(500)
                return res.status(200).send(`Game was created`)
            })
        })
        .catch((e) => res.status(500).send(e))
})

module.exports = router
