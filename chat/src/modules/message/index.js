const express = require('express')
const messageRoute = express.Router()
const {GET} = require('./controller')

messageRoute.route('/messages')
    .get(GET)

module.exports = messageRoute