const express = require('express')
const sessions = require("express-session")
const cookieParser = require("cookie-parser")
const mongoose  = require('mongoose')
require('dotenv').config()

const isAuthenticated = require('./middleware/authenticated')
const userRouter = require('./routes/auth')
const todoRouter = require('./routes/todo')

const app = express()
const port = 3000

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

app.use(express.json())

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(cookieParser())
app.use('/api/v1', userRouter)
app.use(isAuthenticated)
app.use('/api/v1/todo', todoRouter)

const start = async () =>{
    console.log('Server is starting..')
    // db connection
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Database connected..")
    //server
    app.listen(port, ()=>{
        console.log(`todo is listening at port: ${port}`)
    })
}
start().catch(err=>console.log(`db connection failed due to ${err.message}`))

