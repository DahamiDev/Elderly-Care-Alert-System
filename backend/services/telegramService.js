const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const token = process.env.TELEGRAM_BOT_TOKEN;
let bot = null;

if (token && token !== "YOUR_TELEGRAM_BOT_TOKEN_HERE") {
  try {
    bot = new TelegramBot(token, { polling: true });
    console.log("Telegram Bot service initialized successfully.");

    // Message handler to give users their Chat ID
    bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      const firstName = msg.from.first_name || "there";
      const welcomeMsg = `Hello ${firstName}! Welcome to the *Elderly Care Safety Monitoring System* bot.

Your Telegram Chat ID is:
\`${chatId}\`

Please copy this Chat ID and register it in the Child Dashboard under your profile so that you can receive automated check-in links and alert notifications.`;

      bot.sendMessage(chatId, welcomeMsg, { parse_mode: "Markdown" });
    });

    // General message handler for safety verification via Telegram chat
    bot.on("message", (msg) => {
      const chatId = msg.chat.id;
      const text = msg.text ? msg.text.trim().toLowerCase() : "";

      if (
        text === "i am ok" ||
        text === "i'm okay" ||
        text === "ok" ||
        text === "i'm ok"
      ) {
        const Parent = require("../models/parent");
        const History = require("../models/history");

        Parent.findOne({ telegramChatId: chatId.toString() })
          .then((parent) => {
            if (parent) {
              if (parent.checkinStatus === "Safe") {
                bot.sendMessage(
                  chatId,
                  "You have already checked in as Safe today. Thank you!",
                );
                return;
              }
              parent.checkinStatus = "Safe";
              parent.lastCheckinTime = new Date();
              return parent.save().then((savedParent) => {
                // Log history
                const now = new Date();
                const dateStr = now.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });
                const timeStr = now.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                });

                const newHistory = new History({
                  parentId: savedParent._id,
                  name: savedParent.name,
                  date: dateStr,
                  time: timeStr,
                  status: "Safe",
                  source: "Telegram",
                });
                return newHistory.save().then(() => {
                  bot.sendMessage(
                    chatId,
                    "Thank you! Your response 'I am OK' has been recorded, and your status is marked as Safe on the dashboard.",
                  );
                });
              });
            } else {
              bot.sendMessage(
                chatId,
                `Your Chat ID (${chatId}) is not registered to any Parent. Please add this Chat ID in the Child Dashboard first.`,
              );
            }
          })
          .catch((err) => {
            console.error("Error handling Telegram checkin message:", err);
          });
      }
    });
  } catch (err) {
    console.error("Failed to start Telegram bot:", err.message);
  }
} else {
  console.log(
    "WARNING: TELEGRAM_BOT_TOKEN is not configured. Running Telegram Bot service in MOCK mode.",
  );
}

/**
 * Sends check-in link to parent
 * change IO link as HTML
 */
const sendCheckinLink = async (parent) => {
  // add the mylaptops's Ip directly
  const checkinUrl = `http://192.168.197.224:5173/checkin/${parent.checkinToken}`;

  // Telegram clickable link is hear
  const text = `Good morning ${parent.name}! 🌟\n\nPlease click the link below to check in and let us know you are safe:\n\n🔗 <a href="${checkinUrl}">Click Here to Confirm (I AM OK)</a>\n\nAlternatively, you can reply directly to this chat with "I am OK".`;

  if (bot && parent.telegramChatId) {
    try {
      // parse_mode: "HTML" for blue clolor link
      await bot.sendMessage(parent.telegramChatId, text, {
        parse_mode: "HTML",
      });
      console.log(
        `Telegram check-in link sent to parent: ${parent.name} (Chat ID: ${parent.telegramChatId})`,
      );
      return true;
    } catch (error) {
      console.error(
        `Error sending Telegram message to ${parent.name}:`,
        error.message,
      );
      return false;
    }
  } else {
    console.log(
      `[MOCK TELEGRAM] Send check-in link to ${parent.name} (Chat ID: ${parent.telegramChatId}):\n${text}`,
    );
    return true;
  }
};

//Sends emergency escalation alert to child and neighbor

const sendEmergencyAlert = async (parent, neighbor) => {
  const alertText = `🚨 EMERGENCY ALERT: ${parent.name} (${parent.relationship}) has NOT checked in today by the 10:00 AM escalation deadline.\n\nPlease check on them immediately!\nPhone: ${parent.phone}`;

  // 1. Send alert to child
  const childChatId = process.env.CHILD_TELEGRAM_CHAT_ID;
  if (
    bot &&
    childChatId &&
    childChatId !== "YOUR_CHILD_TELEGRAM_CHAT_ID_HERE"
  ) {
    try {
      await bot.sendMessage(childChatId, alertText);
      console.log(
        `Emergency Telegram alert sent to Child (Chat ID: ${childChatId}) for parent ${parent.name}`,
      );
    } catch (error) {
      console.error(`Error sending Telegram alert to Child:`, error.message);
    }
  } else {
    console.log(
      `[MOCK TELEGRAM] Send alert to Child (Chat ID: ${childChatId}):\n${alertText}`,
    );
  }

  // 2. Send alert to neighbor
  if (neighbor && neighbor.telegramChatId) {
    const neighborText = `🚨 EMERGENCY ALERT: ${parent.name} (your neighbor) has NOT checked in today by the 10:00 AM deadline. Since you are a registered emergency contact, please check on them immediately!\nAddress/Phone: ${parent.phone}`;
    if (bot) {
      try {
        await bot.sendMessage(neighbor.telegramChatId, neighborText);
        console.log(
          `Emergency Telegram alert sent to Neighbor ${neighbor.name} (Chat ID: ${neighbor.telegramChatId})`,
        );
      } catch (error) {
        console.error(
          `Error sending Telegram alert to Neighbor ${neighbor.name}:`,
          error.message,
        );
      }
    } else {
      console.log(
        `[MOCK TELEGRAM] Send alert to Neighbor ${neighbor.name} (Chat ID: ${neighbor.telegramChatId}):\n${neighborText}`,
      );
    }
  }
};

module.exports = {
  sendCheckinLink,
  sendEmergencyAlert,
  getBotInstance: () => bot,
};
