const mongoose = require('mongoose');

const { Schema } = mongoose;

const TodoSchema = Schema({
    title: { 
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});

const Todo = mongoose.model('todos', TodoSchema);

module.exports = Todo;
