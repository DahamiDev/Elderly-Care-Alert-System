const express = require("express");
const router = express.Router();

const parentController = require("../controllers/parentController");
const neighborController = require("../controllers/neighborController");
const checkinController = require("../controllers/checkinController");
const statsController = require("../controllers/statsController");
const cronService = require("../services/cronService");
const authController = require("../controllers/authController");

// Auth Routes
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

// Parents CRUD Routes
router.get("/parents", parentController.getAllParents);
router.get("/parents/:id", parentController.getParentById);
router.post("/parents", parentController.createParent);
router.put("/parents/:id", parentController.updateParent);
router.delete("/parents/:id", parentController.deleteParent);

// Neighbors CRUD Routes
router.get("/neighbors", neighborController.getAllNeighbors);
router.get("/neighbors/:id", neighborController.getNeighborById);
router.post("/neighbors", neighborController.createNeighbor);
router.put("/neighbors/:id", neighborController.updateNeighbor);
router.delete("/neighbors/:id", neighborController.deleteNeighbor);

// Check-in and Verification Routes
router.get("/checkin/details/:token", checkinController.getCheckinDetails);
router.post("/checkin/verify/:token", checkinController.verifyCheckin);
router.get("/history", checkinController.getHistory);

// Stats & Dashboard Summary
router.get("/stats", statsController.getDashboardStats);

// Manual Testing Cron Trigger Endpoints
router.get("/test/checkin", async (req, res) => {
  const result = await cronService.run9AMCheckinJob();
  if (result.success) {
    res.json({
      message: "9:00 AM check-in cron job triggered successfully.",
      count: result.count,
    });
  } else {
    res.status(500).json({ error: result.error });
  }
});

router.post("/test/escalation", async (req, res) => {
  const result = await cronService.run10AMEscalationJob();
  if (result.success) {
    res.json({
      message: "10:00 AM escalation alert cron job triggered successfully.",
      alertedCount: result.alertedCount,
    });
  } else {
    res.status(500).json({ error: result.error });
  }
});

module.exports = router;
// previous one
