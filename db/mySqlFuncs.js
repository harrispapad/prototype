// Create a connection to the database
const { db } = require("./dbConfig")

// Function to check if a record exists in a table
const checkRecordExists = async (tableName, column, value) => {
  try {
    const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;
    const [results] = await db.query(query, [value]); // Proper promise-based usage
    return results.length ? results[0] : null;
  } catch (err) {
    throw err;
  }
};


// Export the configuration and utility functions
module.exports = {
  checkRecordExists,
};