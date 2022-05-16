const express = require('express')
const homeRoute = express.Router()
const {GET, POST} = require('./controller')

homeRoute.route('/')
    .get(GET)
    .post(POST)

module.exports = homeRoute