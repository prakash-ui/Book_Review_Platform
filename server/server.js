const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Add this route to handle root URL requests
app.get("/", (req, res) => {
  res.json({ 
    message: "Backend is running! 🚀",
    available_routes: [
      "/api/books",
      "/api/reviews",
      "/api/users",
      "/api/auth"
    ]
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));