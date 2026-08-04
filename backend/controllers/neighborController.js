const Neighbor = require('../models/neighbor');

exports.getAllNeighbors = async (req, res) => {
  try {
    const neighbors = await Neighbor.find({}).sort({ createdAt: -1 });
    res.json(neighbors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNeighborById = async (req, res) => {
  try {
    const neighbor = await Neighbor.findById(req.params.id);
    if (!neighbor) return res.status(404).json({ message: 'Neighbor not found' });
    res.json(neighbor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createNeighbor = async (req, res) => {
  try {
    const { name, phone, telegramChatId, relationship } = req.body;
    if (!name || !phone || !telegramChatId) {
      return res.status(400).json({ message: 'Name, phone, and Telegram Chat ID are required' });
    }
    const newNeighbor = new Neighbor({ name, phone, telegramChatId, relationship });
    await newNeighbor.save();
    res.status(201).json(newNeighbor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateNeighbor = async (req, res) => {
  try {
    const { name, phone, telegramChatId, relationship } = req.body;
    const neighbor = await Neighbor.findById(req.params.id);
    if (!neighbor) return res.status(404).json({ message: 'Neighbor not found' });

    if (name) neighbor.name = name;
    if (phone) neighbor.phone = phone;
    if (telegramChatId) neighbor.telegramChatId = telegramChatId;
    if (relationship) neighbor.relationship = relationship;

    await neighbor.save();
    res.json(neighbor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteNeighbor = async (req, res) => {
  try {
    const neighbor = await Neighbor.findByIdAndDelete(req.params.id);
    if (!neighbor) return res.status(404).json({ message: 'Neighbor not found' });
    res.json({ message: 'Neighbor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
