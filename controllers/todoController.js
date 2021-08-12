const Todo = require('../models/todo')

let todoController = {
  getTodos: async (req, res, next) => {
    try {
      const userId = req.user._id
      const todos = await Todo.find({ userId }).lean().sort({ name: 'asc' })
      return res.render('index', { todos })
    } catch (error) {
      console.error(error)
    }
  },
  postTodo: async (req, res, next) => {
    try {
      const userId = req.user._id
      const name = req.body.name
      await Todo.create({ name, userId })
      return res.redirect('/')
    } catch (error) {
      console.error(error)
    }
  },

  getTodo: async (req, res, next) => {
    try {
      const _id = req.params.id
      const userId = req.user._id
      const todo = await Todo.findOne({ _id, userId }).lean()
      const path = req.path

      if (path.includes('edit')) {
        return res.render('edit', { todo })
      } else {
        return res.render('detail', { todo })
      }
    } catch (error) {
      console.error(error)
    }
  },

  editTodo: async (req, res, next) => {
    try {
      const _id = req.params.id
      const userId = req.user._id
      const { name, isDone } = req.body
      const todo = Todo.findOne({ _id, userId })
      isDone === 'on' ? (todoStatus = true) : (todoStatus = false)

      await todo.update({ name: name, isDone: todoStatus })
      return res.redirect(`/todos/${_id}`)
    } catch (error) {
      console.error(error)
    }
  },

  deleteTodo: async (req, res, next) => {
    try {
      const _id = req.params.id
      const userId = req.user._id
      const todo = await Todo.findOne({ _id, userId })
      await todo.remove()
      return res.redirect('/')
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = todoController
