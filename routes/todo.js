const express = require('express')
const router = express.Router()

const todo = require('../controller/todo')

router.get('/', todo.getTodo)
router.post('/', todo.postTodo)
router.put('/:id', todo.updateTodo)
router.delete('/:id', todo.deleteTodo)
router.get('/filter/', todo.filterByDate)

module.exports = router