const { config, db } = require("../db/dbConfig");
const { countDistinct } = require("../db/mySqlFuncs")

const healthCheck = async () => {
  try {
    // Prepare the connection string (optional, just for logging purposes)
    const connectionString = `mysql://${config.user}:${config.password}@${config.host}/${config.database}`;

    // Test the connection with a simple query
    await db.query("SELECT 1");

    const n_stations = await countDistinct('tollStations', 'tollId');

    // Return health check status
    return {
      status: "OK",
      dbconnection: connectionString,
      n_stations: n_stations
    };
  } catch (error) {
    console.error("Error during healthcheck:", error);

    // Return error status
    return {
      status: "failed",
      dbconnection: `mysql://${config.user}:${config.password}@${config.host}/${config.database}`,
      error: error.message,
    };
  }
};

module.exports = healthCheck;
