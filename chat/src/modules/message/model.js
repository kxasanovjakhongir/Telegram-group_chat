const path = require('path')

const getAllMessages = () => require(path.join(process.cwd(), 'src', 'database', 'messages.json'))

module.exports = {getAllMessages}