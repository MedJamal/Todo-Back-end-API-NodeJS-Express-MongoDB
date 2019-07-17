const mongoose = require('mongoose');

const { Schema } = mongoose;

const TodoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Todo = mongoose.model('todos', TodoSchema);

module.exports = Todo;
