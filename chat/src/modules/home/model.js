const fs = require('fs')
const path = require('path')

const addMessage = (message, file_link) => {
    if (file_link) {
        const messages = require(path.join(process.cwd(), 'src', 'database', 'messages.json'))
        const message_id = messages.length ? messages[messages.length - 1].message_id + 1 : 1
        const newMessage = {message_id, ... message, file_link}
        messages.push(newMessage)
        fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'messages.json'), JSON.stringify(messages, null, 4))
        return newMessage
    } else {
        const messages = require(path.join(process.cwd(), 'src', 'database', 'messages.json'))
        const message_id = messages.length ? messages[messages.length - 1].message_id + 1 : 1
        const newMessage = {message_id, ... message}
        messages.push(newMessage)
        fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'messages.json'), JSON.stringify(messages, null, 4))
        return newMessage
    }
}

module.exports = {addMessage}