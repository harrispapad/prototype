const dotenv = require("dotenv");
const mysql = require("mysql2/promise"); // Correct for promises
dotenv.config();

const config = {
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'harris',
    password: process.env.PASSWORD || 'Database@10',
    database: process.env.DATABASE || 'devOps',
  };



// Create a connection to the database
const db = mysql.createPool(config);

  module.exports = {
    config,
    db
  };