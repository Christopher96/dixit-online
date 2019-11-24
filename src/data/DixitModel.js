class DixitModel {
    processResponse(response) {
        if(response.code === 500)
            return {
                error: "Something went wrong."
            }
        if(response.ok)
            return response.json()

        return response.text().then(error => {
            return {
                error
            }
        })
    }

    get(path) {
        return fetch('/api'+path).then(this.processResponse)
    }

    post(path, data = {}) {
        return fetch('/api'+path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(this.processResponse)
    }

    createGame(gameid, players) {
        return this.post('/games/create', { gameid, players })
    }

    saveGame(game) {
        return this.post('/games/save', { game })
    }

    getGame(gameid) {
        return this.get('/games/'+gameid)
    }
}

export default new DixitModel()
