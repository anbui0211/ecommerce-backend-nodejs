'use strict'

const mongoose = require('mongoose')
const process = require('process')
const os = require('os')
const _SECONDS = 5000

// count connections
const countConnect = () => {
  const countConnection = mongoose.connect.length
  console.log(`Number of connection::${countConnection}`)
}
// check overload  connections
const checkOverLoad = () => {
  setInterval(() => {
    const numConnection = mongoose.connect.length
    const menmoryUsage = process.memoryUsage().rss
    const numCores = os.cpus().length

    // Example maximum number of connections based on the number of cores
    const maxConnection = numCores * 5 // Ví dụ mỗi core chịu đc 5 connection
    console.log(`Active connection::${numConnection}`)
    console.log(`Menmory usage: ${menmoryUsage / 1024 / 1024} MB`)

    if (numConnection > maxConnection) {
      console.log('Connection overload detected!')
      // Notify.send(....)
    }
  }, _SECONDS)
}
module.exports = {
  countConnect,
  checkOverLoad,
}
