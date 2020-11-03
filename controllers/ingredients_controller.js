const express = require('express')
const Ingredient = require('../models/ingredient.js')
const ingredients = express.Router()


ingredients.get('/new', (req, res) => {
    res.send('New Ingredient')
      
})

ingredients.get('/', async (req, res) => {

    let userIngredients = await Ingredient.find({
        '_id': { $in: req.session.currentUser.ingredients }
    }, function(err, docs){
         console.log(docs);
    });

    res.send(userIngredients)
})

ingredients.get('/all', async (req, res) => {

    let allIngredients = await Ingredient.find();

    res.send(allIngredients)
})

ingredients.post('/', async (req, res) => {
    try {
        console.log(req.body);
      let newIngredient = await Ingredient.create(req.body);
      res.send(newIngredient);
    } catch (error) {
      res.send(error);
    }
  });

// SEED ROUTE
ingredients.get('/setup/seed', (req, res) => {
    Ingredient.create(
      [
        {
          name: 'egg'
        },
        {
          name: 'flour'
        },
        {
          name: 'avocado'
        },
        {
          name: 'cheddar cheese'
        }
      ],
      (error, data) => {
        res.redirect('/ingredients')
      }
    )
  })

  module.exports = ingredients