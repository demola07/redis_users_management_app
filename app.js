const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const redis = require('redis')

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

app.get('/', (req, res, next) => {
    res.render('searchusers')
})

app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`)
})