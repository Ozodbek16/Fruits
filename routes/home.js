    const express = require('express')
    const route = express.Router()

    route.get('/', (req, res) => {
        res.render('home', {
            title: 'Bosh sahifa',
        })
    })

    module.exports = route