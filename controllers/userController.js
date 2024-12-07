const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../utils/db');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    const [result] = await db.query(query, [username, email, hashedPassword]);

    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ error: 'Failed to register user' });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [users] = await db.query(query, [email]);

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in user:', error.message);
    res.status(500).json({ error: 'Failed to login user' });
  }
};

const getSeatAvailability = async (req, res) => {
  const { source, destination } = req.query;

  try {
    const query = `
      SELECT * FROM trains 
      WHERE source = ? AND destination = ?`;
    const [trains] = await db.query(query, [source, destination]);

    if (trains.length === 0) {
      return res.status(404).json({ message: 'No trains available for the given route' });
    }

    res.status(200).json({ trains });
  } catch (error) {
    console.error('Error fetching seat availability:', error.message);
    res.status(500).json({ error: 'Failed to fetch seat availability' });
  }
};


module.exports = {
  registerUser,
  loginUser,
  getSeatAvailability,
};
