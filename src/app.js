// const bcrypt = require('bcryptjs')                //has hash methods
require('./db/mongoose')                           //make file run
const express = require('express')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app