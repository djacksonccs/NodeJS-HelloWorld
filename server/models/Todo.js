
var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    text: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: 0
    }
}))

