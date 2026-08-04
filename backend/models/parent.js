const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const parentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  relationship: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  telegramChatId: {
    type: String,
    required: true,
  },
  checkinStatus: {
    type: String,
    enum: ['Pending', 'Safe', 'Escalated'],
    default: 'Pending',
  },
  checkinToken: {
    type: String,
    default: () => uuidv4(),
  },
  lastCheckinTime: {
    type: Date,
    default: null,
  }
}, { timestamps: true });

module.exports = mongoose.model('Parent', parentSchema);
