// adminRoutes.js
const express = require("express");
const router = express.Router();

// Import healthCheck handler from a separate file
const healthCheck = require("../admin/healthCheck");  // Assuming healthCheck.js is in the 'routes' folder
const {truncate, insertCSVData} = require("../db/mySqlFuncs")

// Use async function in route handler
router.get("/healthcheck", async (req, res) => {

    const healthStatus = await healthCheck();

    // Send the response from healthCheck
    res.status(healthStatus.status === 'OK' ? 200 : 500).json(healthStatus);
});

router.post("/resetStations", async (req, res) => {
    try {
      // Truncate the table before loading new data
      await truncate('tollStations');
  
      // Initialize the stations from the CSV file
      await insertCSVData();
  
      // If both operations succeed, send success response
      res.status(200).json({ status: "OK" });
  
    } catch (err) {
      // Handle errors and send failure response with reason
      res.status(500).json({
        status: "failed",
        info: err.message || "An error occurred while resetting stations"
      });
    }
  });
  
module.exports = router;  // Export the router to be used in app.js
