const mongoose = require('mongoose')

const Todo = mongoose.Schema({
    Subject: { type: String },
    Task: { type: String }
})

module.exports = mongoose.model('Todo', Todo)