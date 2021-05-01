// 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
const port = 3000

//install mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true } )

// install handlebars template engine 
const exphbs = require('express-handlebars')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// 設定首頁路由
app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log('this app is running on localhost:3000')
})