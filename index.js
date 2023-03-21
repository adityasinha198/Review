const port = 5000;
const express = require('express')
const app = express()
const path = require('path')
const bodyparser = require('body-parser')
const dotenv = require('dotenv')
const router = require('./routes/commonRoutes');


dotenv.config()

require('./models/config')



app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(express.static(path.join(__dirname,'./public')))
app.use(router)

const server = app.listen(process.env.PORT, () => {
    console.log(`Sever is running on port ${process.env.PORT}`)
})

module.exports = server

