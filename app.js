// Import required modules
const express = require("express");           // Import the Express framework for building the server
const cors = require("cors");                 // Import CORS to enable Cross-Origin Resource Sharing
const path = require("path");                 // Import path for handling file and directory paths
const authRoutes = require('./routes/authRoutes.js'); // Import authentication routes
const adminRoutes = require("./routes/adminRoutes.js"); // Import admin-specific routes
const { authenticate, authorize } = require('./login/authMiddleware'); // Middleware for authentication and authorization
const healthcheckRoute = require("./routes/adminRoutes.js"); // This seems redundant since it points to adminRoutes
const connectDB = require("./db/dbConnect");  // Function to connect to the database

connectDB();

// Initialize Express app
const app = express();

// Import middleware to parse cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser()); // Use cookie-parser middleware to parse cookies

// Define the port from environment variables
const port = process.env.PORT;

// Serve static files (e.g., HTML, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware to parse JSON data in incoming requests
app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: false }));

// Use authentication routes for all root-level endpoints ("/")
app.use('/', authRoutes);

// Redirect the root URL ("/") to the API home page
app.get('/', (req, res) => {
    res.redirect('/api');
});

// Serve the main API page
app.get('/api', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'autogen.html'));
});


// Serve the login page
app.get('/api/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve a page for failed login attempts
app.get('/api/failedLogin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'failedLogin.html'));
});

// Serve the dashboard page with a personalized welcome message
app.get('/api/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'autogen.html'));
});

// Serve the admin dashboard page, protected by authentication and authorization middleware
app.get('/api/admin', authenticate, authorize(['admin']), (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'adminDashboard.html'));
});

// Use admin routes for endpoints starting with "/api/admin"
app.use("/api/admin", adminRoutes);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
