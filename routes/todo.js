const express = require('express')
const router = express.Router()

const todo = require('../controller/todo')

router.get('/search_by_date', todo.filterTodoByDate)
router.route('/')
    .get(todo.getAllTodo)
    .post(todo.postTodo)
router.route('/:id')
    .get(todo.getTodo)
    .patch(todo.updateTodo)
    .delete(todo.deleteTodo)

module.exports = router

// ref

// router.get('/', todo.getTodo)
// router.post('/', todo.postTodo)
// router.put('/:id', todo.updateTodo)
// router.delete('/:id', todo.deleteTodo)
// router.get('/filter/', todo.filterByDate)