const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();
const { config } = require("./dbConfig");


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

module.exports = connectDB