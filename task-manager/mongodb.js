//              >>>>>>>>>>>> without PROMISES!!!!!!!!!!!!


// A PROMISE IS AN ASYNCRONOUS TOOL - SOLVE CALLBACKS PROBLEM
//A PROMISE IS AM EHANCEMENT FOR CALLBACK


// const {MongoClient, ObjectID} = require('mongodb')
const mongodb = require('mongodb');      //mongo db npm!
const MongoClient = mongodb.MongoClient;


// const ObjectID = mongodb.ObjectID;
// const id = new ObjectID()
// console.log(id);
// console.log(id.getTimestamp());


const connectionURL = 'mongodb://127.0.0.1:27017';      //database URL
const databaseName = 'task-manager';                    //wanted database name

//callback called when connect completed
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {  
    if (error) {
        return console.log('cant connect to db')        //no need for else cause of the return
    }
    const db = client.db(databaseName);

    // db.collection('users').find(     {age: 32,}   ).toArray(   (error, users) => {  console.log(users)  }  )
    // db.collection('users').find(     {age: 32,}   ).count(   (error, users) => {  console.log(users)  }  )
    // db.collection('tasks').find( {completed: 'false'} ).toArray(   (error, task) => {  console.log(task)  }  )

    // db.collection('users').findOne({      //is Async
    //     age: 32
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('cant connect to db')
    //     }
    //     console.log(result)
    // })


    // db.collection('users').insertOne({      //is Async
    //     name: 'victor',
    //     age: 54,
    //     _id: id
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('cant connect to db')
    //     }
    //     console.log(result.ops)
    // })


    //     db.collection('tasks').insertMany([
    //         {
    //             name: 'jen',
    //             task: 'shower',
    //             done_till: 'tommorow',
    //             completed: 'false'
    //         }, {
    //             name: 'bob',
    //             task: 'sleep a lot',
    //             completed: 'true'
    //         },
    //         {
    //             name: 'kosta',
    //             task: 'complete this course',
    //             completed: 'false'
    //         }
    //     ],(error, result) => {
    //     if (error) {
    //         return console.log('cant connect to db')
    //     }
    //     console.log(result.ops)
    // })


    db.collection('users').insertMany([
            {
                name: 'zarbal',
                age: 33
            }, {
                name: 'lucky',
                age: 0.1
            }
        ],(error, result) => {
        if (error) {
            return console.log('cant connect to db')
        }
        console.log(result.ops)
    })


    //>>>>>>>>>>>>>>>>. updateOne(filter, update, options, callback){Promise}
    // db.collection('users').updateOne({
    //     _id: new ObjectID('5f30eb8af5cb6d07d4539fe8')
    // },{
    //     $set: {
    //         name: 'mike'
    //     },
    //     $inc:{
    //         age: 1
    //     }
    // }).then( (result) => {
    //     console.log(result.matchedCount);
    // }).catch((error) => {
    //     console.log(error)
    // })                                  //THIS IS A PROMISE SYNTAX


    //>>>>>>>>>>>>>>> updateMany(filter, update, options, callback){Promise.<Collection~updateWriteOpResultObject>}
    //>>>>>>>>>>>>>>>update option works with MONGODB OPERATORS
    // db.collection('tasks').updateMany({
    //     completed: 'false'},
    //     {
    //         $set: { completed: 'true' }
    //     }).then((result) => {
    //         console.log(result.matchedCount);
    //     }).catch((error) => {
    //         console.log(error)
    //     })


    db.collection('users').deleteMany({ age: 35}).then((result)=> {
        console.log(result.deletedCount)
    }).catch((error) => {
        console.log(error)
    })

})

