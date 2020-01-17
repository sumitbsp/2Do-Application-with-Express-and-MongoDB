const mongoose = require('mongoose');               // requiring mongoose

const todoSchema = new mongoose.Schema({            // creating a new schema
    description: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
        
    },
    priority: {
        type: String,
        required: true
    }
});

const Todo = mongoose.model('Todo', todoSchema);            // storinng the schema in Todo variable

module.exports = Todo;          // exporting the model