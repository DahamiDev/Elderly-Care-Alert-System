const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parent',
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String, // format "May 16, 2026"
    required: true,
  },
  time: {
    type: String, // format "8:34 AM"
    required: true,
  },
  status: {
    type: String,
    enum: ['Safe', 'Pending'],
    required: true,
  },
  source: {
    type: String,
    enum: ['Telegram', 'Web'],
    default: 'Web',
  }
}, { timestamps: true });

module.exports = mongoose.model('History', historySchema);
