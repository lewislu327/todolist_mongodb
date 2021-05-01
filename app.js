// 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
const port = 3000
// install Todo model
const Todo = require('./models/todo')

//install mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true } )

// install handlebars template engine 
const exphbs = require('express-handlebars')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

// install body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// 設定首頁路由
app.get('/', (req, res) => {
  // get all todo infos
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos: todos}))
    .catch(error => console.error(error))
})
// route for create todo page
app.get('/todos/new', (req, res) => {
  return res.render('new')
})
// route for create new todo object
app.post('/todos', (req, res) => {
  const name = req.body.name;
  return Todo.create({name: name})
  .then( () => res.redirect('/'))
  .catch( error => console.log(error))
})

// route for todo detail info
app.get('/todos/:id', (req, res) => {
  const id = req.params.id 
  return Todo.findById(id)
  .lean()
  .then( (todo) => res.render('detail', {todo}))
  .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log('this app is running on localhost:3000')
})