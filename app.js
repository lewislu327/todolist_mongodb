// 載入 express 並建構應用程式伺服器
const express = require('express')
// install handlebars template engine 
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const session = require('express-session')
const usePassport = require('./config/passport')
const methOverride = require('method-override')

const app = express()
const PORT = process.env.PORT || 3000

const routes = require('./routes');
const { use } = require('./routes');
require('./config/mongoose')


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(session({
  secret: "someRandomStuffs",
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(methOverride('_method'))
usePassport(app)
app.use(routes)



app.listen(PORT, () => {
  console.log(`this app is running on http://localhost:${PORT}`)
})
