const express = require('express')
const Ingredient = require('../models/ingredient.js')
const User = require('../models/user.js')
const ingredients = express.Router()

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next()
    } else {
      res.redirect('/sessions/new')
    }
  }



//get ingredients of logged in user
ingredients.get('/', isAuthenticated, async (req, res) => {
    const currentUser = await User.findById(req.session.currentUser._id);

    let userIngredients = await Ingredient.find({
        '_id': { $in: currentUser.ingredients}
    });

    res.render('ingredients/index.ejs', { ingredients: userIngredients } );
})

//get all ingredients in DB
ingredients.get('/all', isAuthenticated, async (req, res) => {

    let allIngredients = await Ingredient.find();

    res.send(allIngredients)
})

ingredients.post('/', async (req, res) => {
    console.log(req.body);
    try {
      let newIngredient = await Ingredient.create(req.body);
      res.redirect('/');
    } catch (error) {
      res.send(error);
    }
  });

  // UPDATE
ingredients.put('/remove/user/:id', isAuthenticated, async (req, res) => {

    console.log("Hi");

    curUser = await User.findById(req.session.currentUser._id);

    ingredientIndex = curUser.ingredients.indexOf(req.params.id) ;
    console.log(curUser);

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

ingredients.put('/add/user', isAuthenticated, async (req, res) => {

    curUser = await User.findById(req.session.currentUser._id);;

    console.log(curUser);

    let searchedIngredient = req.body.addedIngredient;

    searchedIngredient = searchedIngredient.toLowerCase();

    await Ingredient.find( { name: searchedIngredient } )

    const foundIngredient = await Ingredient.findOne( { name: searchedIngredient })  

        // Database error
        // if (err) {
        //   console.log(err)
        //   res.send('oops the db had a problem')
        if (!foundIngredient) {
          // if found ingredient doesn't exist, prompt to add to DB
          res.render('ingredients/new.ejs', { ingredient: searchedIngredient })
        } else {
            await User.findByIdAndUpdate(
                req.session.currentUser,
                {
                    $addToSet: {
                        ingredients: foundIngredient,
                      },
                },
                { new: true, upsert: true }
            );
            res.redirect('/ingredients')
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