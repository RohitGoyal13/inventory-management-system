const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const inventoryRoutes = require('./routes/inventory'); // IMPORT ROUTES

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// USE ROUTES
app.use('/api', inventoryRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});