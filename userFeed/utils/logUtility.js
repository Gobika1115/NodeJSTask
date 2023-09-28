const fs = require('fs');
const path = require('path');
const winston = require('winston');

const LOG_DIR = './logs'; // Directory to store log files
const LOG_INTERVAL = 5 * 60 * 1000; // 5 minutes
const CLEANUP_INTERVAL = 30 * 60 * 1000; // 30 minutes

// Create the log directory if it doesn't exist
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

// Create a Winston logger to log messages
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: createNewLogFile() }),
  ],
});

// Function to create a new log file
function createNewLogFile() {
  const timestamp = new Date().toISOString();
  const logFileName = `${timestamp.replace(/:/g, '-')}.log`;
  return path.join(LOG_DIR, logFileName);
}

// Function to rotate log file every LOG_INTERVAL
function rotateLogFile() {
  const logFilePath = createNewLogFile();
  // Update the logger to start logging to the new file
  logger.add(new winston.transports.File({ filename: logFilePath }));
}

// Function to cleanup old log files
function cleanupOldLogFiles() {
  const now = Date.now();
  fs.readdirSync(LOG_DIR).forEach((file) => {
    const filePath = path.join(LOG_DIR, file);
    const stat = fs.statSync(filePath);
    if (now - stat.mtimeMs > CLEANUP_INTERVAL) {
      fs.unlinkSync(filePath);
    }
  });
}

// Schedule log rotation every LOG_INTERVAL
setInterval(rotateLogFile, LOG_INTERVAL);

// Schedule log cleanup every minute
setInterval(cleanupOldLogFiles, 60 * 1000);

module.exports = logger; // Export the logger for use in other parts of your application
