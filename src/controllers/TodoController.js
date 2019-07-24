const Todo = require('../models/Todo');

const todoController = {}

todoController.get = async (request, response, next) => {
    const { user } = request;
    
    const query = {
        owner: user._id
    };

    try {
        const todos = await Todo.find(query).sort({ createdAt: 'desc' });

        return response.status(200).send({
            success: true,
            todos: todos
        });
    } catch (error) {
        next(error);
    }
};

todoController.getOne = async  (request, response, next) => {
    const id = request.params.id;

    try {
        const todo = await Todo.findById({ _id: id });

        if(todo === null || !todo.owner.equals(request.user._id)) {
            return response.status(404).send({
                success: false,
                message: 'Todo does not exist in database!'
            });
        }

        return response.status(200).send({
            success: true,
            todo: todo
        });

    } catch (error) {
        next(error);
    }
};

todoController.create = async (request, response, next) => {
    const { title } = request.body;
    
    const newTodo = new Todo({
        title: title,
        owner: request.user
    });

    try {
        const todo = await newTodo.save();
        return response.send({
            success: true,
            todo: todo
        });
    } catch (error) {
        next(error);
    }
};

todoController.update = async (request, response, next) => {
    const id = request.params.id;
    const { title, completed } = request.body;

    try {
        const todo = await Todo.updateOne(
            {
                _id: id,
                owner: request.user
            },
            {
                title: title,
                completed: completed
            }
        );

        if(todo.n === 0) {
            return response.status(404).send({ success: false, message: 'Todo does not exist!' });
        }

        return response.status(201).send({
            success: true,
            todo: todo
        });
    } catch (error) {
        next(error);
    }
}

todoController.destroy = async (request, response, next) => {
    const id = request.params.id;

    try {
        const result = await Todo.deleteOne({ _id: id, owner: request.user });
        if(result.deletedCount === 0) {
            response.status(404);
            return response.send({
                success: false,
                message: 'Todo not found!'
            });
        }
    } catch (error) {
        next(error);
    }

    return response.status(200).send({
        success: true,
        message: 'Todo deleted'
    });
}

module.exports = todoController;
