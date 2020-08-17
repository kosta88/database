const mongoose = require('mongoose')
const validator = require('validator')
//mongoose connects with given database name!
// mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api' ,{
//     useNewUrlParser: true,
//     useCreateIndex: true
// })

const User = mongoose.model('User' , {              //a database model
    name:{
        type: String,
        require: true,
        trim: true
    },
    email:{
        type:String,
        require: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email invalid')
            }
        }
    },
    password:{
        type:String,
        require: true,
        trim: true,
        minlength: 8,
        validate(value){
            if(value.includes('password')){
                throw new Error('password cannot contain password')
            }
        }
    },
    age:{
        type: Number,
        default: 0,
        validate(value){
            if(value<0 || value > 125 ){
                throw new Error('age must be real')
            }
        }
    } 
})

module.exports = User











// {
//     "name": "bob7",
//     "email": "bobobbob@gmail.com",
//     "password": "123465789",
//     "age": 27
// }