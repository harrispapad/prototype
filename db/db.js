const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();


// Configuration for the database connection
const config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

// Create a connection to the database
const db = mysql.createConnection(config);

// Connect to the database
const connectDB = () => {
  db.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err.stack);
      process.exit(1); // Exit process if connection fails
    } else {
      console.log("Connected to MySQL database");
    }
  });
};

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
  db, // Export the database connection for other parts of the app
  config,
  checkRecordExists,
  connectDB,
};
