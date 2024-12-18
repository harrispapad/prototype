const { db } = require("./dbConfig");

const connectDB = async () => {
  try {
    await db.query("SELECT 1");
    console.log("Connected to MySQL database");
  } catch (error) {
    console.error("Database connection failed:", error.stack);
    process.exit(1);
  }
};

module.exports = connectDB;
