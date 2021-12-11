const express = require('express')

const root = require('./root.js')
const users = require('./users.js')

module.exports = (app) => {
   app.use(`/`, root)
   app.use(`/users`, users)
}
