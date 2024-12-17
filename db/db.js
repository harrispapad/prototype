const mysql = require("mysql2");
const { config } = require("./dbConfig.js")
const connectDB = require("./dbConnect")

// Create a connection to the database
const db = mysql.createConnection(config);


// Function to check if a record exists in a table
const checkRecordExists = (tableName, column, value) => {
  return new Promise((resolve, reject) => {

    const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;

    db.query(query, [value], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length ? results[0] : null);
      }
    });
  });
};

// Export the configuration and utility functions
module.exports = {
  checkRecordExists,
};