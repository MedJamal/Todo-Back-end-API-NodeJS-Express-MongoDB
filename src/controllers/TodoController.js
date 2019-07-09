const Todo = require('../models/Todo');

const todoController = {}

todoController.get = async (request, response, next) => {
    try {
        const todo = await Todo.find();
        response.status(200);
        return response.send({
            success: true,
            todo: todo
        });
    } catch (error) {
        console.log('Error get: Todo Controller with mongoose');
        next(error);
    }
};

todoController.create = async (request, response, next) => {
    console.log('Create Todo');

    const { title, createdAt } = request.body;
    
    const newTodo = new Todo({
        title: title,
        createdAt: createdAt
    });

    try {
        const todo = await newTodo.save();
        return response.send({
            success: true,
            todo: todo
        });
    } catch (error) {
        console.log('Error save: Todo Controller with mongoose');
        next(error);
    }
};

module.exports = todoController;