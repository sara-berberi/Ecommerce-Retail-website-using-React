const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Define routes here
app.get('/', (req, res) => {
  res.send('API is running...');
});


// Use product routes
app.use('/api/products', productRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
