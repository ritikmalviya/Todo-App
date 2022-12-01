const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema(
    {
        todo: {
            type: String,
            require: [true, 'Name is Required'],
            trim: true
        },
        task: [String]
    }
) 

module.exports = mongoose.model('Todo',todoSchema)