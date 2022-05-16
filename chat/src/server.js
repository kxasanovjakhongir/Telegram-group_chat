const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')
const path = require('path')
require('./porod')(app)
const {PORT} = require('./config')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.json())
app.use(fileUpload({
    limits: 500 * 1024 * 1024
}))
const modules = require('./modules')
app.use(modules)

app.listen(PORT, () => console.log(`server is running on http://${PORT}`))
