const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');



dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

//Login Routes
app.use('/api/auth', authRoutes);
//Posts Routes
app.use('/api/posts', postRoutes);
// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Quora Clone API');
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});