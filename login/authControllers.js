const jwt = require("jsonwebtoken");  
const bcrypt = require("bcryptjs");    
const { checkRecordExists } = require("../db/mySqlFuncs"); 

// Login controller function
const login = async (req, res) => {
  // Extract username and password from the request body
  const { username, password } = req.body;

  // Validate input fields
  if (!username || !password) {
    res.status(400).json({ error: "Username or Password fields cannot be empty!" });
    return;
  }

  try {
    // Check if a user with the given username exists in the database
    const existingUser = await checkRecordExists("users", "username", username);

    if (existingUser) { 
      // Check if the user has a valid password stored
      if (!existingUser.password) {
        res.status(401).redirect('./failedLogin'); // Redirect to failed login if no password exists
        return;
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, existingUser.password);

      if (passwordMatch) {
        // Generate a JWT token for authentication
        const token = jwt.sign(
          { 
            username: existingUser.username,  // Payload: username
            access_level: existingUser.access_level // Payload: access level
          },
          process.env.JWT_SECRET, // Secret key for signing the token
          { expiresIn: "1h" }     // Token expiration time: 1 hour
        );

        // Set the JWT token as an HTTP-only cookie
        res.cookie("auth_token", token, { httpOnly: true }).status(200);

        // Check the user's access level and redirect accordingly
        if (existingUser.access_level === 'admin') {
          res.redirect('/api/admin'); // Redirect to the admin dashboard for admin users
        } else {
          res.redirect(`/api/dashboard?username=${encodeURIComponent(username)}`); // Redirect to user dashboard
        }
      } else {
        // If password doesn't match, redirect to failed login page
        res.status(401).redirect('./failedLogin');
      }
    } else {
      // If the user does not exist, redirect to failed login page
      res.status(401).redirect('./failedLogin');
    }
  } catch (error) {
    // Log the request body and send a server error response in case of an exception
    console.log(req.body);
    res.status(500).redirect('./failedLogin');
  }
};

// Export the login controller for use in routes
module.exports = {
  login,
};
