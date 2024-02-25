const compression = require('compression')
const express = require('express')
const { default: helmet } = require('helmet')
const morgan = require('morgan')

const app = express()

// init middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

// init db
require('./dbs/init.mongodb')
// const { countConnect, checkOverLoad } = require('./helpers/check.connect')
// countConnect()
// checkOverLoad()
// init routes
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello, world',
  })
})

// init error handlers

module.exports = app
