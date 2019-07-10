const express = require('express');
const router = express.Router();

const todoController = require('../controllers/TodoController')

router.get('/todos', todoController.get);
router.get('/todo/:id', todoController.getOne);
router.post('/todo', todoController.create);
router.put('/todo/:id', todoController.update);
router.delete('/todo/:id', todoController.destroy);

module.exports = router;