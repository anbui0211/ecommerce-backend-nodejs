const { setDriver } = require('mongoose')

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3052,
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || 'shopDEV',
  },
}

const prod = {
  app: {
    port: process.env.PRO_APP_PORT || 3000,
  },
  db: {
    host: process.env.PRO_DB_HOST || 'localhost',
    port: process.env.PRO_DB_PORT || 27017,
    name: process.env.PRO_DB_NAME || 'shopPROD',
  },
}

const config = { dev, prod }
const env = process.env.NODE_ENV || 'dev'

// console.log(config[env], env)
module.exports = config[env]

function Sum(a, b) {
  return a + b
}
