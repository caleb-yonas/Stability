const express = require('express');
const bodyParser = require('body-parser'); // To parse JSON request bodies
const app = express();
const port = process.env.PORT || 3000; // Use the port you prefer or read from environment variables
const cors = require('cors');
// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Allows request from frontend
app.use(cors());

// Mock database (you should use a real database)
const users = [];

// API endpoint for user registration
app.post('/api/register', (req, res) => {
  console.log(req.body)
  const { username, password } = req.body;

  // Basic validation (you should add more security and validation checks)
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  // Check if the username already exists (you should use a database for this)
  if (users.some((user) => user.username === username)) {
    return res.status(400).json({ error: 'Username already exists.' });
  }

  // Store the user (you should hash and salt the password)
  users.push({ username, password });

  // Respond with a success message
  res.status(200).json({ message: 'Registration successful.' });
});

app.post('/api/check-username', (req, res) => {
  console.log("you are at da api")
  const { username } = req.body;

  // Check if the username already exists in the database
  const isUsernameTaken = users.some((user) => user.username === username);

  if (isUsernameTaken) {
    // Username is already taken
    console.log("ok it reads as taken")
    return res.status(400).json({ message: 'Username is already taken.' });
  }

  // Username is available
  res.status(200).json({ message: 'Username is available.' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
