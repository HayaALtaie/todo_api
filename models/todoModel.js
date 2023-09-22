const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    text :{
        type: String
    }
})

const ToDoModel =mongoose.model('users',todoSchema )
module.exports = ToDoModel;