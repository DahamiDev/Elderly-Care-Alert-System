const mongoose = require('mongoose');

const neighborSchema = new mongoose.Schema({
  name: {
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
  relationship: {
    type: String,
    default: 'Neighbor',
  }
}, { timestamps: true });

module.exports = mongoose.model('Neighbor', neighborSchema);
