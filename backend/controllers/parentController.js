const Parent = require('../models/parent');

exports.getAllParents = async (req, res) => {
  try {
    const parents = await Parent.find({}).sort({ createdAt: -1 });
    res.json(parents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getParentById = async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id);
    if (!parent) return res.status(404).json({ message: 'Parent not found' });
    res.json(parent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createParent = async (req, res) => {
  try {
    const { name, relationship, phone, telegramChatId } = req.body;
    if (!name || !relationship || !phone || !telegramChatId) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newParent = new Parent({ name, relationship, phone, telegramChatId });
    await newParent.save();
    res.status(201).json(newParent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateParent = async (req, res) => {
  try {
    const { name, relationship, phone, telegramChatId, checkinStatus } = req.body;
    const parent = await Parent.findById(req.params.id);
    if (!parent) return res.status(404).json({ message: 'Parent not found' });

    if (name) parent.name = name;
    if (relationship) parent.relationship = relationship;
    if (phone) parent.phone = phone;
    if (telegramChatId) parent.telegramChatId = telegramChatId;
    if (checkinStatus) parent.checkinStatus = checkinStatus;

    await parent.save();
    res.json(parent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteParent = async (req, res) => {
  try {
    const parent = await Parent.findByIdAndDelete(req.params.id);
    if (!parent) return res.status(404).json({ message: 'Parent not found' });
    res.json({ message: 'Parent deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
