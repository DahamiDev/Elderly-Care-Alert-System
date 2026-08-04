const Parent = require("../models/parent");
const History = require("../models/history");

//Get Parent details for the check-in verification page

exports.getCheckinDetails = async (req, res) => {
  try {
    const { token } = req.params;
    const parent = await Parent.findOne({ checkinToken: token });
    if (!parent) {
      return res
        .status(404)
        .json({ message: "Invalid or expired check-in link." });
    }
    res.json({
      name: parent.name,
      relationship: parent.relationship,
      checkinStatus: parent.checkinStatus,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Verify Parent check-in (marks status to Safe)

exports.verifyCheckin = async (req, res) => {
  try {
    const { token } = req.params;
    const parent = await Parent.findOne({ checkinToken: token });
    if (!parent) {
      return res
        .status(404)
        .json({ message: "Invalid or expired check-in link." });
    }

    if (parent.checkinStatus === "Safe") {
      return res.json({
        message: "Already checked in as Safe today.",
        parent,
        alreadyVerified: true,
      });
    }

    // Update status
    parent.checkinStatus = "Safe";
    parent.lastCheckinTime = new Date();
    await parent.save();

    // Create history entry
    const now = new Date();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    // format as "May, 16, 2026"
    const dateStr = `${months[now.getMonth()]}, ${now.getDate()}, ${now.getFullYear()}`;
    // format time as "8.34 AM"
    let timeStr = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    timeStr = timeStr.replace(":", "."); // Figma uses dot e.g. 8.34 AM

    const newHistory = new History({
      parentId: parent._id,
      name: parent.name,
      date: dateStr,
      time: timeStr,
      status: "Safe",
      source: "Web",
    });

    await newHistory.save();

    res.json({
      message: "Check-in recorded successfully.",
      parent,
      alreadyVerified: false,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve Safety History logs
exports.getHistory = async (req, res) => {
  try {
    const history = await History.find({}).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
