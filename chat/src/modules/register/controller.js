const path = require('path')
const uniqueId = require('./../../lib/mhid')
const {registerUser} = require('./model')
const {sign} = require('./../../lib/jwt')

const GET = (req, res) => {
    res.sendFile(path.join(process.cwd(), 'src', 'views', 'register.html'))
}

const POST = (req, res) => {
    let file = req.files.file
    let fileName = uniqueId(5) + file.name.replace(/\s/g, "_").trim()
    file.mv(path.join(process.cwd(), 'src', 'uploads', 'images', fileName), (err) => {
        let user = registerUser(req.body, fileName)
        if (user) {
            res.status(201).json({
                message: "Registered",
                body: user,
                token: sign(user)
            })
        } else {
            res.status(401).json({message: "Error 401"})
        }
    })
}

module.exports = {GET, POST}