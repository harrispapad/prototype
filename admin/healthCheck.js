const express = require("express");
const mysql = require("mysql2/promise");

const router = express.Router();

// Database connection pool setup (configure with your database credentials)
const dbConfig = {
  host: "localhost",   // your database host
  user: "harris",       // your database user
  password: "Database@10", // your database password
  database: "devOps",   // your database name
};

const pool = mysql.createPool(dbConfig);

router.get("/healthcheck", async (req, res) => {
  try {
    // Prepare the connection string using the manually stored dbConfig
    const connectionString = `mysql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}/${dbConfig.database}`;

    // Test the connection to ensure the database is reachable
    await pool.query("SELECT 1");

    // Return the health check status with the required information
    res.status(200).json({
      status: "OK",
      dbconnection: connectionString,
    });
  } catch (error) {
    // Handle error if database connection or query fails
    console.error("Error during healthcheck:", error);
    res.status(401).json({
      status: "failed",
      dbconnection: `mysql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}/${dbConfig.database}`,
    });
  }
});

module.exports = router;
