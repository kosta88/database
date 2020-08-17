const mongoose = require('mongoose')
// const validator = require('validator')           moved to user.js


//works with middleware as well

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})


// const Task = mongoose.model('Task' , {
//     description:{
//         type: String,
//         require: true,
//         trim: true
//     },
//     completed:{
//         type: Boolean,
//         default: false
//     } 
// })


//                      >>>>>>>>>>>>>  A promise returned by mongoose library
// const task = new Task({
//     description: '                   learn everything there is to know',
//     completed: false
// })

// task.save().then(()=> {
//     console.log(task)
// }).catch((error)=>{
//     console.log(error)
// })


// const me = new User({
//     name: 'helen',
//     age: 65,
//     email: 'bobob@gmail.com',
//     password: 'r e v  er'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) =>{
//     console.log(error)
// })




//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    MOVED TO MODELS
// const User = mongoose.model('User' , {              //a database model
//     name:{
//         type: String,
//         require: true,
//         trim: true
//     },
//     email:{
//         type:String,
//         require: true,
//         trim: true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('email invalid')
//             }
//         }
//     },
//     password:{
//         type:String,
//         require: true,
//         trim: true,
//         minlength: 8,
//         validate(value){
//             if(value.includes('password')){
//                 throw new Error('password cannot contain password')
//             }
//         }
//     },
//     age:{
//         type: Number,
//         default: 0,
//         validate(value){
//             if(value<0 || value > 125 ){
//                 throw new Error('age must be real')
//             }
//         }
//     } 
// })