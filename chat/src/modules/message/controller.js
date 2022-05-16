const path = require('path')
const {getAllMessages} = require('./model')

const GET = (req, res) => {
    res.status(200).json(getAllMessages())
}

module.exports = {GET}