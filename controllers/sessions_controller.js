const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
router.get('/new', (req, res) => {
  res.render('sessions/new.ejs', {currentUser : req.session.currentUser })
})
// on sessions form submit (log in)
router.post('/', (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    // Database error
    if (err) {
      console.log(err)
      res.send('oops the db had a problem')
    } else if (!foundUser) {
      // if found user is undefined/null not found etc
      res.send('<a  href="/">Sorry, no user found </a>')
    } else {
      // user is found yay!
      // now let's check if passwords match
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        // add the user to our session
        req.session.currentUser = foundUser
        page = 'partials/nav.ejs'
        console.log("Authenticated user "+req.session.currentUser.username);
        // redirect back to our home page
        res.redirect('/')
      } else {
        // passwords do not match
        res.send('<a href="/"> password does not match </a>')
      }
    }
  })
})
router.delete('/', (req, res) => {
  req.session.destroy(() => {
    page = 'partials/nav-login.ejs'
    res.redirect('/')
  })
})
module.exports = router