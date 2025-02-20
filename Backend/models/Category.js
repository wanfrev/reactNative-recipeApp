const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Para evitar categorías duplicadas
  },
});

module.exports = mongoose.model('Category', categorySchema);