const express = require('express')
const userRoute = express.Router()
const {GET} = require('./controller')

userRoute.route('/users')
    .get(GET)

module.exports = userRoute