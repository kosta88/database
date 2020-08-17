//      >>>> TO USE POROMISE CHAINING YOU >>>return    THE NEXT PROMISE 

require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/tasks')
const { count } = require('./models/user')


//>>>>>>>>>>>>>>>>>>>>>>>.. 5f326e04164f46291c077330

// User.findByIdAndUpdate('5f326e04164f46291c077330', {age: 1}).then((user)=> {
//     console.log(user)
//     return User.countDocuments({age: 1})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })



// const updateAgeAndCount = async (id, age) => {
//     const user = await User.findByIdAndUpdate(id , { age })
//     const count = await User.countDocuments( {age})
//     return count;
// }

// updateAgeAndCount('5f326e04164f46291c077330', 32).then((count) => {
//     console.log(count)
// }).catch( (e) => {
//     console.log(e)
// })



const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments( {completed : false})
    return count;
}
deleteTaskAndCount('5f325c971efe942b3cac8e75').then((count) => {
    console.log(count)
}).catch( (e) => {
    console.log(e)
})
