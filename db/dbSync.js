const { exec } = require('child_process');

// Database connection details
const DB_USER = 'harris';
const DB_PASSWORD = 'Database@10';
const DB_HOST = 'localhost';
const DB_NAME = 'devOps'; // Replace with your database name

// Path to the SQL file
const SQL_FILE = './sync.sql'; // Ensure this path is correct

// Command to execute the SQL file
const command = `mysql -u ${DB_USER} -p${DB_PASSWORD} -h ${DB_HOST} -D ${DB_NAME} < ${SQL_FILE}`;

// Execute the command
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing the SQL file: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error: ${stderr}`);
    return;
  }
  console.log('Database sync completed successfully.');
});
