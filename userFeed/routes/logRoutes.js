const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { ensureSuperAdmin } = require('../middleware/accessControlMiddleware');

const LOG_DIR = './logs';

// Route to retrieve logs by Super Admin
router.get('/logs', ensureSuperAdmin, (req, res) => {
  try {
    // Read the contents of the most recent log file
    const logFiles = fs.readdirSync(LOG_DIR);
    const mostRecentLogFile = logFiles.sort().reverse()[0];
    const logFilePath = path.join(LOG_DIR, mostRecentLogFile);
    const logs = fs.readFileSync(logFilePath, 'utf8');

    res.status(200).json({ logs });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// create a new log file by Super Admin
router.post('/logs/create', ensureSuperAdmin, (req, res) => {
  try {
    const timestamp = new Date().toISOString();
    const logFileName = `${timestamp.replace(/:/g, '-')}.log`;
    const logFilePath = path.join(LOG_DIR, logFileName);

    fs.writeFileSync(logFilePath, '', 'utf8');

    res.status(201).json({ message: 'Log file created successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//delete a specific log file by super admin
router.delete('/logs/:fileName', ensureSuperAdmin, (req, res) => {
  try {
    const fileName = req.params.fileName;
    const filePath = path.join(LOG_DIR, fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.status(200).json({ message: 'Log file deleted successfully' });
    } else {
      res.status(404).json({ message: 'Log file not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
