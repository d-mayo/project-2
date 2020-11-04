const express = require('express')
const Ingredient = require('../models/ingredient.js')
const Recipe = require('../models/recipe.js')
const User = require('../models/user.js')
const recipes = express.Router()

recipes.get('/new', (req, res) => {
    res.render('recipes/new.ejs');
      
})

recipes.get('/all', (req, res) => {
    res.send('New Recipe')
      
})

recipes.post('/', async (req, res) => {
    console.log(req.body);
    // try {
    //   let newRecipe = await Recipe.create(req.body);
    //   res.redirect('/');
    // } catch (error) {
    //   res.send(error);
    // }
  });



  module.exports = recipes