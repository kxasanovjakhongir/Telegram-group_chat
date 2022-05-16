const {sign, verify} = require('jsonwebtoken')
const SECRET_KEY = 'mac'

module.exports = {
    sign: (payload) => sign(payload, SECRET_KEY),
    verify: (token) => verify(token, SECRET_KEY)
}