const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  recipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe', // Hace referencia al modelo de Receta
  }],
  createdAt: {
    type: Date,
    default: Date.now, // Valor por defecto: fecha actual
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Valor por defecto: fecha actual
  },
});

module.exports = mongoose.model('Group', groupSchema);
