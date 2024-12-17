const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const authRoutes = require('./routes/authRoutes.js');
const adminRoutes = require("./routes/adminRoutes.js");
const database = require("./db/db")
const { authenticate, authorize } = require('./login/authMiddleware');
const healthcheckRoute = require("./routes/adminRoutes.js");

const { config } = require("./db/dbConfig");
const connectDB = require("./db/dbConnect")

const db = connectDB();

dotenv.config();
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

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

app.get('/api/admin', authenticate, authorize(['admin']), (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'public', 'adminDashboard.html'));
    });

app.use("/api/admin", adminRoutes);
   
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });