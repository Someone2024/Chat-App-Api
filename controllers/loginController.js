// authController.js
const jwt = require('./Auth');
const createUser = require('../models/User');
const { collection, query, where, getDocs, limit } = require('firebase/firestore');
const db = require("./FirebaseController")

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const usersRef = collection(db, "users")
  const userQuery = query(usersRef, where("username", "==", username), limit(1));

  try {
  const user = await getDocs(userQuery);

    if (user.empty) {
        //if it does not exist create it
        await createUser(username, password)
      return res.status(404).json({ 
        message: 'User not found. creating a new one... TRY AGAIN',
     });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await jwt.comparePasswords(password, user.docs[0].data().password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate a JWT token
    const token = jwt.generateToken({ username: user.docs[0].data().username });
    req.username = user.docs[0].data().username;
    console.log(req.username);

    // Send the token to the client
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Failed to log in.' });
  }
};