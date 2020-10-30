const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = Schema({
  username: { type: String, unique: true, required: true },
  password: String,
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