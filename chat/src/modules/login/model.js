const path = require('path')

const loginUser = (user) => {
    const users = require(path.join(process.cwd(), 'src', 'database', 'users.json'))
    let found = users.find(u => u.username == user.username && u.password == user.password)
    if (found) {
        delete found.password
        return found
    } else return
}


module.exports = {loginUser}