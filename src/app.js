const compression = require('compression')
const express = require('express')
const { default: helmet } = require('helmet')
const morgan = require('morgan')

const app = express()

// init middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// init db
require('./dbs/init.mongodb')
// const { countConnect, check OverLoad } = require('./helpers/check.connect')
// countConnect()
// checkOverLoad()

// init routes
app.use('/', require('./routes'))

// init error handlers

module.exports = app
