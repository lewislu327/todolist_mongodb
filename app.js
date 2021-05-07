// 載入 express 並建構應用程式伺服器
const express = require('express')
// install handlebars template engine 
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
// require method override
const methOverride = require('method-override')
const Todo = require('./models/todo')

const app = express()
const port = 3000

const routes = require('./routes')


//install mongoose
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true } )


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')


app.use(express.urlencoded({ extended: true }))

app.use(methOverride('_method'))

app.use(routes)

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.listen(port, () => {
  console.log('this app is running on localhost:3000')
})