const bcrypt = require('bcrypt')
const express = require('express')
const User = require('../models/user.js')
const Ingredient = require('../models/ingredient.js')
const users = express.Router()



users.get('/new', (req, res) => {
  res.render(
    'users/new.ejs'
    , {currentUser: req.session.currentUser}
  )
})

users.get('/seed',  async (req, res) => {
  

  let allIngredients = await Ingredient.find({});

  let foundFood = await User.findByIdAndUpdate(
    req.session.currentUser._id,
    {
      
      ingredients: allIngredients,
      
    },
    { new: true, upsert: true }
  );

  

  res.send('Hi')

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