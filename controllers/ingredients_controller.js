const express = require('express')
const Ingredient = require('../models/ingredient.js')
const User = require('../models/user.js')
const ingredients = express.Router()


ingredients.get('/new', (req, res) => {
    res.send('New Ingredient')
      
})

ingredients.get('/', async (req, res) => {

    let userIngredients = await Ingredient.find({
        '_id': { $in: req.session.currentUser.ingredients }
    });

    res.render('ingredients/index.ejs', { ingredients: userIngredients } );
})

ingredients.get('/all', async (req, res) => {

    let allIngredients = await Ingredient.find();

    res.send(allIngredients)
})

ingredients.post('/', async (req, res) => {
    try {
      let newIngredient = await Ingredient.create(req.body);
      res.redirect('/');
    } catch (error) {
      res.send(error);
    }
  });

  // UPDATE
ingredients.put('/remove/user/:id', async (req, res) => {

    curUser = req.session.currentUser;

    ingredientIndex = curUser.ingredients.indexOf(req.params.id) ;

    curUser.ingredients.splice( ingredientIndex, 1);

    
    let selectedUser = await User.findByIdAndUpdate(
        curUser._id,
        {
            ingredients: curUser.ingredients,
        },
        { new: true, upsert: true }
      );

     res.redirect('/ingredients');
});

ingredients.put('/add/user', async (req, res) => {

    curUser = req.session.currentUser;

    let searchedIngredient = req.body.addedIngredient;

    searchedIngredient = searchedIngredient.toLowerCase();

    Ingredient.find( { name: searchedIngredient } )

    Ingredient.findOne( { name: searchedIngredient }, async (err, foundIngredient) => {
        // Database error
        if (err) {
          console.log(err)
          res.send('oops the db had a problem')
        } else if (!foundIngredient) {
          // if found user is undefined/null not found etc
          res.render('ingredients/new.ejs', { ingredient: searchedIngredient })
        } else {
            let selectedUser = await User.findByIdAndUpdate(
                req.session.currentUser,
                {
                    $push: {
                        ingredients: foundIngredient,
                      },
                },
                { new: true, upsert: true }
              );
              res.redirect('/');
          
        }
      })
     
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