const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')          //has hash methods
const jwt = require('jsonwebtoken')
const Task = require('./tasks')

//>>>>>>>>>>> MOST MONGOOSE STUFF
const userScema = new mongoose.Schema({              //a database model
    hasclub: {
        type: String,
        default: "false",
    },
    clubName: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('email invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        validate(value) {
            if (value.includes('password')) {
                throw new Error('password cannot contain password')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0 || value > 125) {
                throw new Error('age must be real')
            }
        }
    },
    avatar: {
        type: Buffer
    },
    tokens: [{
        type: String,
        required: true
    }]
},

    //out of the schema
    {
        timestamps: true
    })

//virtual property >>>>>>>>>>>VIRTUAL FIELD
userScema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',              //with what the foreign field assocciated with
    foreignField: 'owner'           //name of fiels that creates realationship
})

//METHODS ON STATICS BELONG TO THE MODEL, METHODS BELONGS TO INSTANCE
userScema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat([token])
    await user.save()
    return token;
}

//gets called when object gets stingified
userScema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    return userObject;
}

//>>>>>>>>>>>>>....     mongoose user schema adding to its functions
userScema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) { throw new Error('unable to login') }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) { throw new Error('unable to login') }
    return user
}

//hashing a password >>> pre Save middleware method
userScema.pre('save', async function (next) {
    const user = this;           //no arrow functio cause arrow functions dont know >>> this
    if (user.isModified('password')) { user.password = await bcrypt.hash(user.password, 8) }
    next();
})

//delete all tasks when remove user
userScema.methods.removeTasks = async function () {
    const id = this._id;           //no arrow function cause arrow functions dont know >>> this
    await Task.deleteMany({ owner: id }, (err, res) => {
    })
}

const User = mongoose.model('User', userScema)         //<<<<<<<<<< THE MODELS NAME DFINITION

module.exports = User
