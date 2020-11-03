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
  tags: [
      {
          type: String
      }
  ]
})

module.exports = mongoose.model('Recipe', recipeSchema)