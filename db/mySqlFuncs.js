const fs = require("fs");
const { db } = require("./dbConfig");
const path = require("path");
const { count } = require("console");

const checkRecordExists = async (tableName, column, value) => {
  try {
    const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;
    const [results] = await db.query(query, [value]); // Proper promise-based usage
    return results.length ? results[0] : null;
  } catch (err) {
    throw err;
  }
};

const truncate = async (tableName) => {
  try {
    const query = `TRUNCATE TABLE ${tableName}`;
    await db.query(query); // No need to capture results, just run the query
    console.log('Table Truncated succesfully');
  } catch (err) {
    throw new Error(`Failed to truncate table: ${err.message}`);
  }
};

const fileName = path.join(__dirname, '../', 'tollstations2024.csv'); 

const initStations = async () => {
  try {
    const filePath = path.join(__dirname, '../', 'tollstations2024.csv');
    const data = fs.readFileSync(filePath, 'utf8'); // Read file content
    
    const rows = data.split('\n').slice(1); // Skip header row
    
    for (const row of rows) {
      const values = row.split(',').map(value => value.trim().replace(/"/g, ''));
      
      const query = `
        INSERT INTO tollStations (opId, operator, tollId, name, pm, locality, road, lat, longitude, email, price1, price2, price3, price4)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      await db.query(query, values);
    }
    
    console.log('CSV data inserted successfully!');
  } catch (err) {
    console.error('Error inserting CSV data:', err.message);
  }
};

const countDistinct = async (tableName, column) => {
  try {
    // Dynamically create the query with the table name and column
    const query = `SELECT COUNT(DISTINCT ??) AS count FROM ??`;

    // Execute the query, using the table and column parameters
    const [results] = await db.query(query, [column, tableName]);

    return results[0].count;
  } catch (err) {
    throw new Error(`Failed to count distinct values: ${err.message}`);
  }
};


// Export the configuration and utility functions
module.exports = {
  checkRecordExists,
  truncate,
  initStations,
  countDistinct
};
