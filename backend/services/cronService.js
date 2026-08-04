const cron = require("node-cron");
const { v4: uuidv4 } = require("uuid");
const Parent = require("../models/parent");
const Neighbor = require("../models/neighbor");
const telegramService = require("./telegramService");

//Resets parent check-in status to Pending, updates their tokens, and sends Telegram links.
//Runs daily at 9:00 AM

const run9AMCheckinJob = async () => {
  console.log("Running scheduled 9:00 AM Parent Check-in job...");
  try {
    const parents = await Parent.find({});
    for (const parent of parents) {
      parent.checkinStatus = "Pending";
      parent.checkinToken = uuidv4();
      await parent.save();

      // Send telegram check-in link
      await telegramService.sendCheckinLink(parent);
    }
    console.log(`9:00 AM check-in completed for ${parents.length} parents.`);
    return { success: true, count: parents.length };
  } catch (error) {
    console.error("Error in 9:00 AM check-in job:", error);
    return { success: false, error: error.message };
  }
};

//Checks for parents who are still Pending, updates their status to Escalated,
//and sends alerts to the registered Child and Neighbors.
//Runs daily at 10:00 AM

const run10AMEscalationJob = async () => {
  console.log("Running scheduled 10:00 AM Escalation Alert job...");
  try {
    const pendingParents = await Parent.find({ checkinStatus: "Pending" });
    if (pendingParents.length === 0) {
      console.log("No pending parents found. All safe! No alerts needed.");
      return { success: true, alertedCount: 0 };
    }

    const neighbors = await Neighbor.find({});
    console.log(
      `Found ${pendingParents.length} non-responsive parents. Alerting contacts...`,
    );

    for (const parent of pendingParents) {
      parent.checkinStatus = "Escalated";
      await parent.save();

      // If there are no specific neighbors, send alert just to child.
      // If neighbors exist, alert each neighbor as well.
      if (neighbors.length === 0) {
        await telegramService.sendEmergencyAlert(parent, null);
      } else {
        for (const neighbor of neighbors) {
          await telegramService.sendEmergencyAlert(parent, neighbor);
        }
      }
    }

    console.log("10:00 AM escalation job completed.");
    return { success: true, alertedCount: pendingParents.length };
  } catch (error) {
    console.error("Error in 10:00 AM escalation job:", error);
    return { success: false, error: error.message };
  }
};

// Schedule Cron Jobs
const initCrons = () => {
  // 9:00 AM checkin: '0 9 * * *'
  run9AMCheckinJob();
  cron.schedule("0 9 * * *", () => {
    //* * * * *
    //0 9 * * *
    run9AMCheckinJob();
  });

  // 10:00 AM escalation: '0 10 * * *'
  cron.schedule("* * * * *", () => {
    //0 10 * * *
    //* * * * *
    run10AMEscalationJob();
  });

  console.log("Cron jobs scheduled: 9:00 AM Check-in & 10:00 AM Escalation.");
};

module.exports = {
  initCrons,
  run9AMCheckinJob,
  run10AMEscalationJob,
};
// previous
