const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { checkRecordExists } = require("../db/db");
const mysql = require("mysql2/promise");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username or Password fields cannot be empty!" });
    return;
  }

  try {
    const existingUser = await checkRecordExists("users", "username", username);

    if (existingUser) {
      if (!existingUser.password) {
        res.status(401).redirect('./failedLogin');
        return;
      }

      const passwordMatch = await bcrypt.compare(password, existingUser.password);

      if (passwordMatch) {
        const token = jwt.sign(
          { username: existingUser.username, access_level: existingUser.access_level },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        res.cookie("auth_token", token, { httpOnly: true }).status(200);

        // Check the access level and redirect accordingly
        if (existingUser.access_level === 'admin') {
          res.redirect('/api/admin');
        } else {
          res.redirect(`/api/dashboard?username=${encodeURIComponent(username)}`);
        }
      } else {
        res.status(401).redirect('./failedLogin');
      }
    } else {
      res.status(401).redirect('./failedLogin');
    }
  } catch (error) {
    console.log(req.body);
    res.status(500).redirect('./failedLogin');
  }
};

module.exports = {
  login,
};
