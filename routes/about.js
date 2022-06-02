const express = require('express')
const { route } = require('./fruits')
const router = express.Router()


router.get('/', (req, res) => {
    res.render('about',{
        title:'About fruits'
    })
})


module.exports = router