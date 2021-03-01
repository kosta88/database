const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    by: {
        type: String,
    },
    level: {
        type: String,
    },
    question: {
        type: String,
    },
    correct: {
        type: String,
    },
    a: {
        type: String,
    },
    b: {
        type: String,
    },
    c: {
        type: String,
    },
    d: {
        type: String,
    },
// owner: {  type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: 'User'   }
}
// ,{ timestamps: true }

)
const Question = mongoose.model('Question', questionSchema)     //<<<<<<<<<< THE MODELS NAME DFINITION

module.exports = Question