const User = require('../models/user');

// Create a new user
exports.createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    const token = req.headers.authorization; 
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
  
      // Check if the user's role is "Super Admin"
      if (decodedToken.role !== 'Super Admin') {
        return res.status(403).json({ message: 'Permission denied' });
      }
  
      // Create a new user document in the database
      const newUser = new User({
        name,
        email,
        password,
        role,
      });
  
      const savedUser = await newUser.save();
      const { password: _, ...userWithoutPassword } = savedUser.toObject();
  
      res.status(201).json({ user: userWithoutPassword });
    } catch (error) {
      console.error(error);
  
      if (error.name === 'JsonWebTokenError') {
        res.status(401).json({ message: 'Authentication failed' });
      } else {
        res.status(500).json({ message: 'Server error' });
      }
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, email, password, role } = req.body;
    const token = req.headers.authorization;
  
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
  
      // Check if the user's role is either "Admin" or "Super Admin"
      if (decodedToken.role !== 'Admin' && decodedToken.role !== 'Super Admin') {
        return res.status(403).json({ message: 'Permission denied' });
      }
  
      // Find and update the user document in the database by ID
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, email, password, role },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      const { password: _, ...userWithoutPassword } = updatedUser.toObject();
  
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error(error);
  
      if (error.name === 'JsonWebTokenError') {
        res.status(401).json({ message: 'Authentication failed' });
      } else {
        res.status(500).json({ message: 'Server error' });
      }
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    const token = req.headers.authorization;
  
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
  
      // Check if the user's role is "Super Admin"
      if (decodedToken.role !== 'Super Admin') {
        return res.status(403).json({ message: 'Permission denied' });
      }
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
  
      if (error.name === 'JsonWebTokenError') {
        res.status(401).json({ message: 'Authentication failed' });
      } else {
        res.status(500).json({ message: 'Server error' });
      }
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    const userId = req.params.id;
    const token = req.headers.authorization;
  
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      if (decodedToken.role !== 'Admin' && decodedToken.role !== 'Super Admin') {
        return res.status(403).json({ message: 'Permission denied' });
      }
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const { password, ...userWithoutPassword } = user.toObject();
  
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error(error);
  
      if (error.name === 'JsonWebTokenError') {
        res.status(401).json({ message: 'Authentication failed' });
      } else {
        res.status(500).json({ message: 'Server error' });
      }
    }
  };


// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


  
  
