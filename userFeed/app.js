const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const feedRoutes = require('./routes/feedRoutes');
const logRoutes = require('./routes/logRoutes');
const authMiddleware = require('./middleware/authMiddleware');


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Database connection
mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/auth', authRoutes);
app.use('/users', authMiddleware.verifyToken, userRoutes);
app.use('/feeds', feedRoutes);
app.use('/logs', authMiddleware.verifyToken, logRoutes);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
