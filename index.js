//import datasevice file from service folder
const dataservice = require('./service/dataservice')

//Import jsonwebtoken
const jwt = require('jsonwebtoken')

//import express

const express = require('express')
const { json } = require('express')

//create app

const app = express()

//to convert json datas
app.use(express.json())




//middleware for verify the token

const jwtmiddleware = (req, res, next) => {
    console.log("................router specific middleware...............");
    try {
        const token = req.headers['access-token']
        const data = jwt.verify(token, "secretkey123")
        console.log(data);
        next()              //to come out of middleware function to work or it will get stuck at the function

    }
    catch{
        res.status(422).json({
            statusCode:422,
            status:false,
            message:"Please login"
        })
    }
    
    
}




//request

//register

app.post('/register', (req, res) => {
    const result = dataservice.register(req.body.acno, req.body.uname, req.body.psw)
    res.status(result.statusCode).json(result)   //json- to convert into json instead of send(result)
})



//login
app.post('/login', (req, res) => {
    const result = dataservice.login(req.body.acno, req.body.psw)
    res.status(result.statusCode).json(result)
})



//deposit
app.post('/deposit', jwtmiddleware, (req, res) => {
    const result = dataservice.deposit(req.body.acno, req.body.psw, req.body.amount)
    res.status(result.statusCode).json(result)
})

//withdraw
app.post('/withdraw',jwtmiddleware, (req, res) => {
    const result = dataservice.withdraw(req.body.acno, req.body.psw, req.body.amount)
    res.status(result.statusCode).json(result)
})
//transaction history
app.get('/transaction',jwtmiddleware, (req, res) => {
    const result = dataservice.gettransaction(req.body.acno)
    res.status(result.statusCode).json(result)
})

//delete

//set port
app.listen(3000, () => {

    console.log("server started at port number 3000");
}
)