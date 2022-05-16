const express = require('express')
const loginRoute = express.Router()
const {GET, POST} = require('./controller')

loginRoute.route('/login')
    .get(GET)
    .post(POST)

module.exports = loginRoute