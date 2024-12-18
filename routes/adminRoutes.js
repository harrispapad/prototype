// adminRoutes.js
const express = require("express");
const router = express.Router();

// Import healthCheck handler from a separate file
const healthCheck = require("../admin/healthCheck");  // Assuming healthCheck.js is in the 'routes' folder

// Use async function in route handler
router.get("/healthcheck", async (req, res) => {

    const healthStatus = await healthCheck();

    // Send the response from healthCheck
    res.status(healthStatus.status === 'OK' ? 200 : 500).json(healthStatus);
});

module.exports = router;  // Export the router to be used in app.js
