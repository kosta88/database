const express = require('express')
require('./db/mongoose')
// const User = require('./models/user')
// const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const bcrypt = require('bcryptjs')          //has hash methods
const app = express()
const port = process.env.PORT || 3000

// const router = new express.Router();
// router.get('/test', ( req, req ) => {
// })
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const myFunction = async () => {
    const password = '123456black'
    const hashedPass = await bcrypt.hash(password, 8)
    const isMatch = await bcrypt.compare(password, hashedPass)
    console.log( password, hashedPass, isMatch)
}
    myFunction()


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})