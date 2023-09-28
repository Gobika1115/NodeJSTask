const jwt = require('jsonwebtoken');
const bcryptUtils = require('../utils/bcrypt');
const User = require('../models/user');
const config = require('../config/jwt');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    const hashedPassword = await bcryptUtils.hashPassword(password);

    // Create a new user with the hashed password
    const newUser = new User({ name, email, password: hashedPassword });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed: User not found' });
    }

    // Verify the provided password with the hashed password
    const isMatch = await bcryptUtils.verifyPassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Authentication failed: Incorrect password' });
    }

    // Generate a JWT token with the user's ID
    const token = jwt.sign(
      { userId: user._id },
      config.secretKey,
      { expiresIn: config.tokenExpiration }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
