// authController.js
const jwt = require('./jwt');
const User = require('../models/User');

exports.logIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
        //if it does not exist create it
      return res.status(404).json({ message: 'User not found.' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await jwt.comparePasswords(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate a JWT token
    const token = jwt.generateToken({ userId: user._id });

    // Send the token to the client
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Failed to log in.' });
  }
};
