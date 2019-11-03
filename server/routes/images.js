const config = require('./config')

const fetch = require('node-fetch')

// Gets express router
const express = require('express')
const router = express.Router()

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

const get = async(action, params = {}) => {
    const query = jsonToQuery(params)
    const url = config.endpoint + action + query;

    const response = await fetch(url, {
        headers
    })
    return await response.json()
}

const post = async(action, data = {}) => {
    const url = config.endpoint + action;

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers,
    })
    return await response.json()
}

const filter = (s) => {
    if (typeof s !== 'string') return ''
    const maxlen = 100
    // Capitalize and restrict length
    return (s.charAt(0).toUpperCase() + s.slice(1)).slice(0,maxlen)
}

router.get('/', async(req, res, next) => {
    try {
        const data = await get('/photos/random', {
            count: 10,
            orientation: 'portrait'
        })
        const images = data.map(img => {
            return {
                color: img.color,
                urls: img.urls,
                description: filter(img.description || img.alt_description)
            }
        })
        return res.status(200).json(images)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e);
    }
})

module.exports = router
