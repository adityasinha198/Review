const chai = require('chai')
const server = require('../index')
const chaiHttp = require('chai-http')
const utils = require('../models/userModelSchema')
const routes = require('../routes/userRoutes')

chai.should()
chai.use(chaiHttp)


describe("User Login API",()=>{
    describe("POST/api/users",()=>{
        it("It should return login user deatails :",(done)=>{
            console.log("OKO")
            const data = {
                useremail:"adityasinha198@gmail.com",
                password:"Aditya@9"
            };
            chai
            .request(server)
            .post('/user/userSignIn')
            .send(data)
            .end((err,res)=>{
                res.should.have.status(200);
                res.should.be.a("object")
                res.body.should.have.property("success").eq("success")
                res.body.should.have.property("message").eq("User logged-in suceesfully")
                res.body.should.have.property("token")
                done()
            })

        })
    })
})






        it("It should show  email error details :",(done)=>{
            
            const data = {
                useremail:"adityasinha8@gmail.com",
                password:"Aditya@9"
            };
            chai
            .request(server)
            .post('/user/userSignIn')
            .send(data)
            .end((err,res)=>{
                res.should.have.status(401);
               
                res.body.should.have.property("success").eq("failure")
                res.body.should.have.property("error").eq("Invalid credentials")
               
                done()
            })

        })

        


        

        it("It should password Error :",(done)=>{
            
            const data = {
                useremail:"adityasinha198@gmail.com",
                password:"Aditya@6"
            };
            chai
            .request(server)
            .post('/user/userSignIn')
            .send(data)
            .end((err,res)=>{
                res.should.have.status(401);
               
                res.body.should.have.property("success").eq("failure")
                res.body.should.have.property("error").eq("Invalid credentials")
               
                done()
            })

        })





