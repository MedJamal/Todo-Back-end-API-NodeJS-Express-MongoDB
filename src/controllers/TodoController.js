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

todoController.getOne = async  (request, response, next) => {
    const id = request.params.id;

    try {
        const todo = await Todo.findById({ _id: id });
        
        if(todo === null) return response.status(404).send({
            success: false,
            message: 'Todo does not exist in database!'
        });

        return response.status(200).send({
            success: true,
            todo: todo
        });

    } catch (error) {
        console.log('Error get one todo: Todo Controller with mongoose');
        next(error);
    }
}

todoController.create = async (request, response, next) => {
    console.log('Create Todo');

    const { title } = request.body;
    
    const newTodo = new Todo({
        title: title
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

todoController.update = async (request, response, next) => {
    const id = request.params.id;
    const { title, completed } = request.body;

    // Check if Todo does not exist in the db and retuen false with message ..

    // if(todo === null) return response.status(404).send({
    //     success: false,
    //     message: 'Todo does not exist in database!'
    // });

    try {
        const todo = await Todo.updateOne(
            { _id: id },
            { title: title, completed: completed }
        );

        if(todo.n === 0) {
            return response.status(404).send({ success: false, message: 'Todo does not exist!' });
        }

        return response.status(201).send({
            success: true,
            todo: todo
        });
    } catch (error) {
        console.log('Error update: Todo Controller with mongoose');
        next(error);
    }
}

todoController.destroy = async (request, response, next) => {
    const id = request.params.id;

    try {
        const result = await Todo.deleteOne({ _id: id });
        if(result.deletedCount === 0) {
            response.status(404);
            return response.send({
                success: false,
                message: 'Todo not found!'
            });
        }
    } catch (error) {
        console.log('Error delete: Todo Controller with mongoose');
        next(error);
    }
    
    return response.send({
        success: true,
        message: 'Todo deleted'
    });
}

module.exports = todoController;
