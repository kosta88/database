const mongoose = require('mongoose')
const validator = require('validator')

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
