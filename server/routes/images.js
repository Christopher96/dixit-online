const fetch = require('node-fetch')
const { get, post } = require('./methods')

// Gets express router
const express = require('express')
const router = express.Router()

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
        return res.status(500).json(e);
    }
})

module.exports = router
