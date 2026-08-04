const Parent = require('../models/parent');
const Neighbor = require('../models/neighbor');
const History = require('../models/history');

exports.getDashboardStats = async (req, res) => {
  try {
    // 1. Get counts
    const parentsCount = await Parent.countDocuments({});
    const neighborsCount = await Neighbor.countDocuments({});
    const totalCheckins = await History.countDocuments({ status: 'Safe' });
    const pendingAlerts = await Parent.countDocuments({ checkinStatus: { $in: ['Pending', 'Escalated'] } });

    // 2. Today's check-ins list (all parents)
    const parentsList = await Parent.find({});
    const todayCheckins = parentsList.map(parent => {
      let checkinTime = '-';
      if (parent.checkinStatus === 'Safe' && parent.lastCheckinTime) {
        const time = new Date(parent.lastCheckinTime);
        let formattedTime = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        checkinTime = formattedTime.replace(':', '.'); // format like 8.34 AM
      }
      return {
        id: parent._id,
        name: parent.name,
        phone: parent.phone,
        relationship: parent.relationship,
        status: parent.checkinStatus,
        time: checkinTime,
        telegramChatId: parent.telegramChatId
      };
    });

    // 3. Recent Alerts (parents with Pending or Escalated status)
    const escalatedParents = await Parent.find({ checkinStatus: { $in: ['Pending', 'Escalated'] } });
    const recentAlerts = escalatedParents.map(parent => {
      // Mock alert time as 8:00 AM or 10:00 AM based on status
      const alertTime = parent.checkinStatus === 'Escalated' ? '10.00 AM' : '8.00 AM';
      return {
        id: parent._id,
        name: parent.name,
        message: parent.checkinStatus === 'Escalated' ? 'No check-in today (Escalated)' : 'No check-in today',
        time: alertTime
      };
    });

    res.json({
      counts: {
        parents: parentsCount,
        neighbors: neighborsCount,
        totalCheckins,
        pendingAlerts
      },
      todayCheckins,
      recentAlerts
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
