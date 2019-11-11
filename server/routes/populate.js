
module.exports = (req, res) => {
    
    const Game = require('../models/Game')

    let game = new Game({
        gameid: "test",
        players: [
            { name: "Robert" },
            { name: "Chris" },
            { name: "Anna" },
        ]
    })

    game.save(err => {
        if(err) res.send(500).send(err)
        else res.sendStatus(200)
    })
}
