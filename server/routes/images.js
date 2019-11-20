const fetch = require('node-fetch')
const { get, post } = require('./methods')

const Card = require('../models/Card')

const filter = (s) => {
    if (typeof s !== 'string') return ""
    const maxlen = 100
    // Capitalize and restrict length
    return (s.charAt(0).toUpperCase() + s.slice(1)).slice(0,maxlen)
}


module.exports.get_cards = async(count, query) => {
    try {
        const data = await get('/search/photos', {
            query,
            page: 1,
            per_page: count,
            orientation: 'portrait'
        })
        const cards = data.results.map(img => {
            return new Card({
                color: img.color,
                thumbnail: img.urls.thumb,
                full: img.urls.regular,
                description: filter(img.description || img.alt_description)
            })
        })
        return cards
    } catch(e) {
        throw e;
    }
}
