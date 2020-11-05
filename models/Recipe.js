const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = Schema({
  title: { type: String, required: true },
  creator: { type: String, required: true },
  ingredients: [
    { type: String, required: true }
  ],
  amount: [
    { type: String, required: true }
  ],
  measurement: [
    { type: String, required: true }
  ],
  instructions: [
    { type: String, required: true }
  ]
})

module.exports = mongoose.model('Recipe', recipeSchema)