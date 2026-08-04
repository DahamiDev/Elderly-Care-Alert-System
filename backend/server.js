const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const apiRoutes = require("./routes/api");
const cronService = require("./services/cronService");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", apiRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date(),
    mongodb:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// Database connection & Server start
const dbUri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/elderly_care";
console.log(`Connecting to MongoDB at: ${dbUri}...`);

mongoose
  .connect(dbUri)
  .then(() => {
    console.log("MongoDB Connected successfully.");
    startServer();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    console.log(
      "Starting server in offline-database mode for local testing...",
    );
    startServer();
  });

function startServer() {
  app.listen(PORT, () => {
    console.log(
      `Elderly Care Safety Monitoring System backend running on port ${PORT}`,
    );

    // Initialize cron jobs
    cronService.initCrons();
  });
}

//Starts the backend server.
// Connects to the MongoDB database.
// Configures middleware.
// Loads API routes.
// Starts scheduled cron jobs.
// Checks whether the server is running.
