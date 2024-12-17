#!/usr/bin/env node

const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");
const { program } = require("commander");

// Database connection configuration
const dbConfig = {
  host: "localhost",
  user: "harris",
  password: "Database@10", // Replace with your MySQL root password
  database: "devOps",
};

// Function to register a user
async function registerUser(username, password, access_level) {
  try {
    // Connect to the database
    const connection = await mysql.createConnection(dbConfig);

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the user into the database
    const insertQuery = `
      INSERT INTO users (username, password, access_level)
      VALUES (?, ?, ?)
    `;

    const [result] = await connection.execute(insertQuery, [username, hashedPassword, access_level]);

    console.log("User registered successfully with userId:", result.insertId);

    // Close the connection
    await connection.end();
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

// Commander.js setup
program
  .name("se2415")
  .description("Register user")
  .version("1.0.0");

program
  .option("--usermod")
  .description("Register a new user")
  .requiredOption("--username <username>", "Username for the new user")
  .requiredOption("--password <password>", "Password for the new user")
  .requiredOption("--access_level <access_level>", "User access level (tollCompany, admin, privilegedUser")
  .action((options) => {
    const { username, password, access_level } = options;
    registerUser(username, password, access_level);
  });

// Parse command-line arguments
program.parse(process.argv);