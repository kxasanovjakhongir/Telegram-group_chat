const path = require('path')
const {getAllUsers} = require('./model')

const GET = (req, res) => {
    res.status(200).json(getAllUsers())
}

module.exports = {GET}