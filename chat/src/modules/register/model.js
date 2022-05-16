const fs = require('fs')
const path = require('path')

const registerUser = (user, avatar_link) => {
    const users = require(path.join(process.cwd(), 'src', 'database', 'users.json'))
    let found = users.find(u => u.username == user.username)
    if (!found) {
        const userId = users.length ? users[users.length - 1].user_id + 1 : 1
        const newUser = {user_id : userId, ... user, avatar_link}
        users.push(newUser)
        fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), JSON.stringify(users, null, 4))
        delete newUser.password
        return newUser
    } else return
}


module.exports = {registerUser}