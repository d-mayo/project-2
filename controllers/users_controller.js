const bcrypt = require('bcrypt')
const express = require('express')
const User = require('../models/user.js')
const users = express.Router()

users.get('/new', (req, res) => {
    res.send('New User')
      
})

users.post('/', (req, res) => {
  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    console.log('user is created', createdUser)
    res.redirect('/')
  })
})

module.exports = users