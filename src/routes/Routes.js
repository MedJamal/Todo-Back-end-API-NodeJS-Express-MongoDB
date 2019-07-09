const express = require('express');
const router = express.Router();

const todoController = require('../controllers/TodoController')

router.get('/todos', todoController.get);
router.post('/todo', todoController.create);

module.exports = router;