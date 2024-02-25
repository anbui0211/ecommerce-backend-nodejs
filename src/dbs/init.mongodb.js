'use strict'
const mongoose = require('mongoose')

const connectStr = 'mongodb://localhost:27017/shopDEV'

// Use singleton design pattern -> Only initiates one connection
class Database {
  constructor() {
    this.connect()
  }

  // connect
  connect(type = 'mongodb') {
    // Dev
    if (1 === 1) {
      mongoose.set('debug', true)
      mongoose.set('debug', { color: true })
    }

    mongoose
      .connect(connectStr, {
        maxPoolSize: 50,
      })
      .then((_) => {
        console.log('Connect mongodb successfully')
      })
      .catch((err) => {
        console.log('Connect mongodb failed', err)
      })
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }

    return Database.instance
  }
}

const instanceMongoDB = Database.getInstance()
module.exports = instanceMongoDB
