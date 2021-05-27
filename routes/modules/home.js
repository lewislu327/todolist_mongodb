// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Todo = require('../../models/todo')
// 定義首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id
  Todo.find({ userId })
    .lean()
    .sort({ name: 'asc'})
    .then(todos => res.render('index', { todos: todos}))
    .catch(error => console.error(error))
})

// 匯出路由器
module.exports = router 