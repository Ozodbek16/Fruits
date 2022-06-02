const express = require('express')
const { create } = require('express-handlebars')
const app = express()
const path = require('path')
require('dotenv').config()

const hbs = create({
    extname: 'hbs',
    defaultLayout: 'layout'
})


app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const home = require('./routes/home')
const fruits = require('./routes/fruits')
const about = require('./routes/about')


app.use('/', home)
app.use('/fruits', fruits)
app.use('/about', about)

try {
    const port = normalizePort(process.env.port || 7000)
    app.listen(port, () => {
        console.log(`Server ${port} bilan ishlatilyapti`)
    })
} catch (error) {
    console.log(error)
}

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}