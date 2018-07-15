const mongoose = require('mongoose');

console.log("Mongoose DB File got called");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/DrewsTodo', { useNewUrlParser: true });

module.exports = { mongoose }