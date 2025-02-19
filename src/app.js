const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');

dotenv.config(); // Remove the path parameter

const app = express();
app.use(cors());
app.use(express.json()); // Ensure this middleware is present

app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch(err => {
    console.log(err);
  });