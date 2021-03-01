// const bcrypt = require('bcryptjs')                //has hash methods
require('./db/mongoose')                           //make file run
const express = require('express')

const cors = require('cors')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const questionRouter = require('./routers/question')

const app = express()
app.use(express.json())
app.use(cors())

app.use(userRouter)
app.use(taskRouter)
app.use(questionRouter)

module.exports = app