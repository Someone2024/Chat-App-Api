// jwt.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const JWT_SECRET = process.env.JWT_SECRET;

// Function to generate a JWT token
const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Function to verify a JWT token
const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

// Function to hash passwords
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Function to compare hashed passwords
const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  generateToken,
  verifyToken,
  hashPassword,
  comparePasswords,
};
