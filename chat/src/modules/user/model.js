const fs = require('fs')
const path = require('path')

const getAllUsers = () => require(path.join(process.cwd(), 'src', 'database', 'users.json'))


module.exports = {getAllUsers}