const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination directory for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Specify the filename with a timestamp
  }
});

const upload = multer({ storage: storage });

// Serve static files from the uploads directory
// Ensure that the directory path is correct relative to your server file
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

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
router.post('/', upload.array('images', 5), async (req, res) => { // Limit to 5 images
  try {
    const { name, price, description, category, subcategory, brand, genderCategory } = req.body;

    // Map uploaded files to image URLs
    const images = req.files.map(file => `/uploads/${file.filename}`);
    console.log('Mapping result', images)

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      subcategory,
      brand,
      images,
      genderCategory
    });

    const savedProduct = await newProduct.save();
    console.log("sAVEED", savedProduct)
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Add more routes as needed

module.exports = router;
