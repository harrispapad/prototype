// adminRoutes.js
const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require('../login/authMiddleware'); // Middleware for authentication and authorization

app = express();

// Serve the admin dashboard page, protected by authentication and authorization middleware
app.get('/api/admin', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'adminDashboard.html'));
});

app.use('/api/admin/*', authenticate, authorize(['admin']));


// Import healthCheck handler from a separate file
const healthCheck = require("../admin/healthCheck");  
const {truncate, initStations} = require("../db/mySqlFuncs")

// Use async function in route handler
router.get("/healthcheck", async (req, res) => {

    const healthStatus = await healthCheck();

    // Send the response from healthCheck
    const stat = (healthStatus.status === 'OK' ? 200 : 401);
    res.status(stat).json(healthStatus);
});

router.post("/resetStations", async (req, res) => {
    try {
      // Truncate the table before loading new data
      await truncate('tollStations');
  
      // Initialize the stations from the CSV file
      await initStations();
  
      // If both operations succeed, send success response
      res.status(200).json({ status: "OK" });
  
    } catch (err) {
      // Handle errors and send failure response with reason
      res.status(401).json({
        status: "failed",
        info: err.message || "An error occurred while resetting stations"
      });
    }
  });
  
module.exports = router;  // Export the router to be used in app.js
