const express = require('express')
const Ingredient = require('../models/ingredient.js')
const Recipe = require('../models/recipe.js')
const User = require('../models/user.js')
const ingredients = require('./ingredients_controller.js')
const recipes = express.Router()

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next()
    } else {
      res.redirect('/sessions/new')
    }
}

recipes.get('/new', isAuthenticated, (req, res) => {
    res.render('recipes/new.ejs', { user: req.session.currentUser });
      
})

recipes.get('/created', isAuthenticated, (req, res) => {
    Recipe.find({ creator: req.session.currentUser.username }, (error, allRecipes) => {
        res.render('recipes/created.ejs', {
          recipes: allRecipes,
          currentUser: req.session.currentUser
        })
    })
      
})

recipes.get('/:id', isAuthenticated, (req, res) => {
    Recipe.findById(req.params.id, (error, foundRecipe) => {
      res.render('recipes/show.ejs', {
        recipe: foundRecipe
        ,  currentUser: req.session.currentUser
      })
    })
})

recipes.get('/all', isAuthenticated, (req, res) => {
    res.send('New Recipe')
      
})



// UPDATE
recipes.put('/:id', isAuthenticated, (req, res) => {
  
    Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (error, updatedModel) => {
        res.redirect('/recipes/created')
      }
    )
  })

recipes.delete('/:id', isAuthenticated, (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, (err, deletedFruit) => {
      res.redirect('/recipes/created');
    })
  })

recipes.post('/', isAuthenticated, async (req, res) => {
    req.body.creator = req.session.currentUser.username;
    console.log(req.body);

    try {
        let newIngredient = await Recipe.create(req.body);
        res.redirect('/recipes/created');
    } catch (error) {
        res.send(error);
      }

  });






  module.exports = recipes