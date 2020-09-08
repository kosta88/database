const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')

const testUserID = new mongoose.Types.ObjectId()

const testUser = {
    _id: testUserID,
    name: 'myTest',
    email: 'kosta@gmail.com',
    password: '1324657985',
    tokens: [
         jwt.sign({_id: testUserID.toString() } , process.env.JWT_SECRET)
    ]
}

const testUserID2 = new mongoose.Types.ObjectId()

const testUser2 = {
    _id: testUserID2,
    name: 'myTest235',
    email: 'kosta235@gmail.com',
    password: '1324657985',
    tokens: [
         jwt.sign({_id: testUserID2.toString() } , process.env.JWT_SECRET)
    ]
}
const configDB = async () => {
    await User.deleteMany()
    await new User(testUser).save()
    await new User(testUser2).save()

}



module.exports = {
    testUserID,
    testUser,
    testUser,
    configDB
}