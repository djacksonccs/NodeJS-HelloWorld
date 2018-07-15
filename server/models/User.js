var mongoose = require('mongoose');

module.exports = mongoose.model('User', mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    age: {
        type: Number,
        default: 0
    }
}))

