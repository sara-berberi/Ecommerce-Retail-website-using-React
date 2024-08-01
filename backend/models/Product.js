const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  Category: {
    type: String
  },
  Subcategory: {
    type: String
  },
  brand: {
    type: String
  },
  images: {
    type: [String],  // Define images as an array of strings
    default: []
  }
  
});

module.exports = mongoose.model('Product', productSchema);
