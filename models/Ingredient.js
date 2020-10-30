const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: '',
      unique: true,
    }
  },
  { timestamps: true, collation: { locale: 'en', strength: 2 } }
);

module.exports = mongoose.model('Actor', actorSchema);