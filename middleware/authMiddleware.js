const jwt = require('jsonwebtoken');
const db = require('../utils/db');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Assuming token is in the Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const [user] = await db.query('SELECT * FROM users WHERE id = ?', [decoded.userId]);

    if (!user || user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
