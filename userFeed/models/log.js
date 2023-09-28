const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  log_data: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
