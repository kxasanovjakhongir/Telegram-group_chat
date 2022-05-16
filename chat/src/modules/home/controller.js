const path = require('path')
const uniqueId = require('./../../lib/mhid')
const {addMessage} = require('./model')

const GET = (req, res) => {
    res.sendFile(path.join(process.cwd(), 'src', 'views', 'index.html'))
}

const POST = (req, res) => {
    if (req.files) {
        let file = req.files.file
        let fileName = uniqueId(5) + file.name.replace(/\s/g, "_").trim()
        file.mv(path.join(process.cwd(), 'src', 'uploads', 'files', fileName), (err) => {
            if (err) console.log(err)
            let message = addMessage(req.body, fileName)
            if (message) {
                res.status(201).json({
                    message: "The message has sent",
                    body: message
                })
            } 
        })    
    } else {
        let message = addMessage(req.body)
            if (message) {
                res.status(201).json({
                    message: "Error 201",
                    body: message
                })
            } 
    }
}

module.exports = {GET, POST}