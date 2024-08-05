const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // Add this line for path module
const productRoutes = require('../backend/routes/productRoutes'); 

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Define port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Ensure this path is correct

// Define routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Set up product routes
app.use('/api/products', productRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
