const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const authRoutes = require('./routes/authRoutes.js');
const database = require("./db/db")

dotenv.config();
const app = express();

const port = process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", authRoutes);

app.get('/', (req, res) => {
    res.redirect('/api');
});

app.get('/api', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  app.get('/api/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
  });
  
  app.get('/api/failedLogin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'failedLogin.html'));
  });
  
  app.get('/api/dashboard', (req, res) => {
    const { username } = req.query;  // Extract username from the query string
    
    // Send the dashboard page with a welcome message
    res.send(`<h1>Welcome, ${username}!</h1>`);
  });
  
  database.connectDB();
  
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });