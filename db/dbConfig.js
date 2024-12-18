const dotenv = require("dotenv");
const mysql = require("mysql2/promise"); // Correct for promises
dotenv.config();

const config = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  };



// Create a connection to the database
const db = mysql.createPool(config);

  module.exports = {
    config,
    db
  };