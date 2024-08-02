const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
const PORT =  5000;
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', userRoutes);

// MongoDB Connection
const MONGO_URI = 'mongodb://127.0.0.1:27017/user_mngmt'; 
mongoose.connect(MONGO_URI)
  .then(() => {
      console.log(`connected to db`);
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
