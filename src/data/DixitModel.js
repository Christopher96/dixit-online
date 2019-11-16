import ObservableModel from "./ObservableModel";

class DixitModel extends ObservableModel {
    jsonToQuery(json) {
        return '?' + 
            Object.keys(json).map(function(key) {
                if(json[key]) return encodeURIComponent(key) + '=' +
                    encodeURIComponent(json[key]);
            }).join('&');
    }

    processResponse(response) {
        if(response.code === 500)
            throw response;
        if(response.ok)
            return response.json()
        return response.text().then(error => {
            return {
                error
            }
        });
    }

    get(path, params = {}) {
        let url = path + this.jsonToQuery(params);
        return fetch('/api'+url).then(this.processResponse);
    }

    post(path, data = {}) {
        return fetch('/api'+path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(this.processResponse);
    }

    createGame(gameid, players) {
        return this.post('/games/create', { gameid, players });
    }

    getGame(gameid) {
        return this.get('/games/'+gameid);
    }

    getImages(count = 6, query = 'landscape') {
        return this.get('/images', {count, query})
    }
}

export default new DixitModel();
