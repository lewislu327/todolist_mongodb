const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')
const todoController = require('../../controllers/todoController')

// route for create todo page
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', todoController.postTodo)
router.get('/:id', todoController.getTodo)
router.get('/:id/edit', todoController.getTodo)
router.put('/:id', todoController.editTodo)
router.delete('/:id', todoController.deleteTodo)

module.exports = router
