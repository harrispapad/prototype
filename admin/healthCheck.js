// healthCheck.js
const mysql = require("mysql2/promise");

const dbConfig = {
  host: "localhost",       // your database host
  user: "harris",          // your database user
  password: "Database@10", // your database password
  database: "devOps",      // your database name
};

// Create the database connection pool with timeout
const pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timeout: 5000, // Timeout after 5 seconds
});

const healthCheck = async () => {
  try {

    // Prepare the connection string
    const connectionString = `mysql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}/${dbConfig.database}`;

    // Test the connection
    await pool.query("SELECT 1");

    // Return health check status
    return {
      status: "OK",
      dbconnection: connectionString,
    };
  } catch (error) {
    console.error("Error during healthcheck:", error);

    // Return error status
    return {
      status: "failed",
      dbconnection: `mysql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}/${dbConfig.database}`,
      error: error.message,
    };
  }
};

module.exports = healthCheck;
