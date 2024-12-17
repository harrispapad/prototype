-- Create the users table if it doesn't already exist
CREATE TABLE IF NOT EXISTS users (
  userId INT UNIQUE NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  access_level ENUM('tollCompany', 'admin', 'privilegedUser') NOT NULL,
  PRIMARY KEY (userId)
);

-- Insert new data, ignoring duplicates
INSERT IGNORE INTO users (username, password, access_level) VALUES
('', 'hashed_password1', 'admin'),
('user2', 'hashed_password2', 'privilegedUser'),
('user3', 'hashed_password3', 'tollCompany');
