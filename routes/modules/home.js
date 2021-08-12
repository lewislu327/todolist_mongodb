const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

router.get('/', async (req, res) => {
  const userId = req.user._id

  try {
    const todos = await Todo.find({ userId }).lean().sort({ name: 'asc' })
    return res.render('index', { todos })
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
