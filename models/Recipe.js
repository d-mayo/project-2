const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = Schema({
  title: { type: String, unique: true, required: true },
  author: { type: String, unique: true, required: true },
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient',
    },
  ],
  amount: [
    { type: String, required: true }
  ],
  measurement: [
    { type: String, required: true }
  ],
  instructions: [
      { 
          type: String, required: true
      }
  ]
})

module.exports = mongoose.model('Recipe', recipeSchema)