const express = require('express');
const cors = require('cors'); 
const Product = require('../models/Product');

const router = express.Router();



// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new product
router.post('/products', async (req, res) => {
  try {
    const { name, price, description, Category, Subcategory, brand, images } = req.body;

    const newProduct = new Product({
      name,
      price,
      description,
      Category,
      Subcategory,
      brand,
      images  // Ensure images array is correctly mapped
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: 'Failed to create product' });
  }
});


// Add more routes as needed

module.exports = router;
