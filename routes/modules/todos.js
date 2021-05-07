const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')


// route for create todo page
router.get('/new', (req, res) => {
  return res.render('new')
})
// route for create new todo object
router.post('/', (req, res) => {
  const name = req.body.name;
  return Todo.create({name: name})
  .then( () => res.redirect('/'))
  .catch( error => console.log(error))
})

// route for todo detail info
router.get('/:id', (req, res) => {
  const id = req.params.id 
  return Todo.findById(id)
  .lean()
  .then( (todo) => res.render('detail', {todo}))
  .catch(error => console.log(error))
})

// route for edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id 
  return Todo.findById(id)
  .lean()
  .then( (todo) => res.render('edit', {todo}))
  .catch(error => console.log(error))
})

// route to post edited todo object
router.put('/:id', (req, res) => {
  const id = req.params.id 
  const { name, isDone } = req.body
  return Todo.findById(id)
  .then( todo => {
    todo.name = name
    todo.isDone = isDone === 'on'
    return todo.save()
  })
  .then( () => res.redirect(`/todos/${id}`))
  .catch(error => console.log(error))
})

// route to delete todo object
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id) 
   .then( (todo) => todo.remove())
   .then( () => res.redirect('/'))
   .catch(error => console.log(error))
})

module.exports = router