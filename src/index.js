// const User = require('./models/user')        //MOVED TO ROUTERS
// const Task = require('./models/task')
const express = require('express')
require('./db/mongoose')                           //make file run
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const bcrypt = require('bcryptjs')                //has hash methods

const app = express()
const port = process.env.PORT 
//middleware function regestration > cause its before 
// app.use( (req, res, next) => {
//     // console.log(req.method, req.path)
//     // if(req.method === 'GET'){ }
//     next()
// })
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
// const myFunction = async () => {
//     const password = '123456black'
//     const hashedPass = await bcrypt.hash(password, 8)
//     const isMatch = await bcrypt.compare(password, hashedPass)
//     console.log( password, hashedPass, isMatch)
// }
//     myFunction()

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


// const jwt = require('jsonwebtoken')
// const myFunction = async () => {
//     const token = jwt.sign({_id:'abc123'}, 'thisismyCourse', {expiresIn: '7 days'})
//     console.log(token)

//     const data = jwt.verify( token, 'thisismyCourse')
//     console.log(data)
// }


// myFunction()
