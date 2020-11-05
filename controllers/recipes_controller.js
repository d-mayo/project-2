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

recipes.get('/all', isAuthenticated, (req, res) => {

    console.log(req.session.currentUser);
    Recipe.find({ }, (error, allRecipes) => {
        res.render('recipes/created.ejs', {
          recipes: allRecipes,
          currentUser: req.session.currentUser
        })
    })
      
})

recipes.get('/find', isAuthenticated, async (req, res) => {
    let ingredientNames = [];


    const currentUser = await User.findById(req.session.currentUser._id);

    //console.log(req.session.currentUser);
    const ingredientArray = currentUser.ingredients;

    for (let i = 0; i < ingredientArray.length; i++){
        let foundIngredient = await Ingredient.findById( ingredientArray[i] );
        ingredientNames.push(foundIngredient.name);

    }
    let foundRecipes = await Recipe.find({
        'ingredients': { $in: ingredientNames}
    });

    res.render('recipes/created.ejs', { recipes: foundRecipes, currentUser: req.session.currentUser});
      
})

recipes.get('/:id/edit', isAuthenticated, async (req, res) => {
    
    const currentRecipe = await Recipe.findById(req.params.id);

    res.render('recipes/edit.ejs', { recipe: currentRecipe, currentUser: req.session.currentUser })

})

recipes.get('/:id', isAuthenticated, (req, res) => {
    
    Recipe.findById(req.params.id, (error, foundRecipe) => {
        display = 'display: none';
        if ( foundRecipe.creator == req.session.currentUser.username ){
            display = 'display: block';
        }
      res.render('recipes/show.ejs', {
        recipe: foundRecipe,  
        currentUser: req.session.currentUser,
        show: display

      })
    })
})

// UPDATE
recipes.put('/:id', isAuthenticated, (req, res) => {
  
    Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (error, updatedModel) => {
        res.redirect('/recipes/')
      }
    )
})

recipes.delete('/:id', isAuthenticated, (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, (err, deletedFruit) => {
      res.redirect('/recipes');
    })
})

recipes.post('/', isAuthenticated, async (req, res) => {
    req.body.creator = req.session.currentUser.username;
    console.log(req.body);

    try {
        let newIngredient = await Recipe.create(req.body);
        res.redirect('/recipes');
    } catch (error) {
        res.send(error);
      }

});

recipes.get('/', isAuthenticated, (req, res) => {
    Recipe.find({ creator: req.session.currentUser.username }, (error, allRecipes) => {
        res.render('recipes/created.ejs', {
          recipes: allRecipes,
          currentUser: req.session.currentUser
        })
    })
      
})






  module.exports = recipes