const port = 5000;
const express = require('express')
const app = express()
const path = require('path')
const bodyparser = require('body-parser')
const dotenv = require('dotenv')
const router = require('./routes/commonRoutes');
const cors = require('cors')


dotenv.config()
require('./models/config')

app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(express.static(path.join(__dirname,'./public')))
app.use(router)
// IP ADDRESS - 192.168.29.28

const server = app.listen(process.env.PORT, () => {
    console.log(`Sever is running on port ${process.env.PORT}`)
})

module.exports = server

