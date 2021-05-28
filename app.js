const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const session = require('express-session')
const usePassport = require('./config/passport')
const methOverride = require('method-override')
const flash = require('connect-flash')

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

app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  // res.locals.errors = req.flash('errors');
  next()
})

app.use(routes)



app.listen(PORT, () => {
  console.log(`this app is running on http://localhost:${PORT}`)
})
