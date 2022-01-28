const express = require('express')
const app = express()
const port = 3000
const sessions = require("express-session");
const cookieParser = require("cookie-parser");

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

const isAuthenticated = require('./middleware/authenticated')
const userRouter = require('./routes/auth')
const todoRouter = require('./routes/todo')

app.use('/', userRouter)
app.use(isAuthenticated)
app.use('/todo', todoRouter)


app.listen(port, ()=>{
    console.log(`todo is listening at port: ${port}`)
})
