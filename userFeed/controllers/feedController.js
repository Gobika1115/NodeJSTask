const Feed = require('../models/feed');

exports.getFeedById = async (req, res) => {
    const feedId = req.params.id; 
    try {
      const feed = await Feed.findById(feedId);
      if (!feed) {
        return res.status(404).json({ message: 'Feed not found' });
      }
      res.json({ feed });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
};

exports.createFeed = async (req, res) => {
    const { name, url, description } = req.body;
    const token = req.headers.authorization;
  
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      if (decodedToken.role !== 'Admin' && decodedToken.role !== 'Super Admin') {
        return res.status(403).json({ message: 'Permission denied' });
      }
      const newFeed = new Feed({
        name,
        url,
        description,
      });
  
      const savedFeed = await newFeed.save();
  
      res.status(201).json({ feed: savedFeed });
    } catch (error) {
      // Handle token verification errors or database query errors
      console.error(error);
  
      if (error.name === 'JsonWebTokenError') {
        res.status(401).json({ message: 'Authentication failed' });
      } else {
        res.status(500).json({ message: 'Server error' });
      }
    }
};

exports.updateFeed = async (req, res) => {
    const feedId = req.params.id;
    const { name, url, description } = req.body;
    const token = req.headers.authorization;
  
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      if (decodedToken.role !== 'Admin' && decodedToken.role !== 'Super Admin') {
        return res.status(403).json({ message: 'Permission denied' });
      }
      const updatedFeed = await Feed.findByIdAndUpdate(
        feedId,
        { name, url, description },
        { new: true }
      );
      if (!updatedFeed) {
        return res.status(404).json({ message: 'Feed not found' });
      }
  
      res.json({ feed: updatedFeed });
    } catch (error) {
      console.error(error);
      if (error.name === 'JsonWebTokenError') {
        res.status(401).json({ message: 'Authentication failed' });
      } else {
        res.status(500).json({ message: 'Server error' });
      }
    }
};

exports.deleteFeed = async (req, res) => {
    const feedId = req.params.id;
    const token = req.headers.authorization; 
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      if (decodedToken.role !== 'Admin' && decodedToken.role !== 'Super Admin') {
        return res.status(403).json({ message: 'Permission denied' });
      }
      const deletedFeed = await Feed.findByIdAndDelete(feedId);
      if (!deletedFeed) {
        return res.status(404).json({ message: 'Feed not found' });
      }
  
      res.json({ message: 'Feed deleted successfully' });
    } catch (error) {
      console.error(error);
  
      if (error.name === 'JsonWebTokenError') {
        res.status(401).json({ message: 'Authentication failed' });
      } else {
        res.status(500).json({ message: 'Server error' });
      }
    }
};


  
  
  
  