const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const redis = require('redis')

// Create Redis CLient
let client = redis.createClient()

client.on('connect', () => {
    console.log(`Connected to Redis`)
})

// Set Port
const PORT = 3000;

// Init app
const app = express()

// view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// method override
app.use(methodOverride('_method'))

// Search page
app.get('/', (req, res, next) => {
    res.render('searchusers')
})

// Search processing
app.post('/user/search', (req, res, next) => {
    let id = req.body.id;

    client.hgetall(id, (err, obj) => {
        if (!obj) {
            res.render('searchusers', {
                error: "User does not exist"
            })
        } else {
            obj.id = id
            res.render('details', {
                user: obj
            })
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`)
})