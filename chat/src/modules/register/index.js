const express = require('express')
const registerRoute = express.Router()
const {GET, POST} = require('./controller')

registerRoute.route('/register')
    .get(GET)
    .post(POST)

module.exports = registerRoute