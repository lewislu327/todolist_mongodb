const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: 'user/login'

}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'All columns is required'})
  }

  if ( password !== confirmPassword) {
    errors.push({ message: 'Password is not same with confirm password'})
  }

  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ email }).lean().then( user => {
    if(user) {
      errors.push({ message: 'This Email had registered'})
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    } 

    return User.create({
      name,
      email,
      password,
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
    
  })

})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg','You have successfully logged out ')
  res.redirect('/users/login')
})

module.exports = router 