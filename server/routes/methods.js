const config = require('./config')
const fetch = require('node-fetch')

const headers = {
    'Authorization': 'Client-ID ' + config.access_key
}

const jsonToQuery = (json) => {
    return '?' + 
        Object.keys(json).map(function(key) {
            if(json[key]) return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
}

module.exports.get = async(action, params = {}) => {
    const query = jsonToQuery(params)
    const url = config.endpoint + action + query;
    try {
        const response = await fetch(url, {
            headers
        })
        return await response.json()
    } catch (e){
        console.log('error', e)
    }
}

module.exports.post = async(action, data = {}) => {
    const url = config.endpoint + action;

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers,
    })
    return await response.json()
}

