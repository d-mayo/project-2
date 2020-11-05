const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
  username: { type: String, unique: true, required: true },
  password: String,
  ingredients: [ 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient',
      
    },
  ]
})

module.exports = mongoose.model('User', userSchema)