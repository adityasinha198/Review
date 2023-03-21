const chai = require('chai')
const server = require('../index')
const chaiHttp = require('chai-http')
const utils = require('../models/')
const routes = require('../routes/userRoutes')

chai.should()
chai.use(chaiHttp)