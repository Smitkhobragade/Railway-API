const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../utils/db');

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
    getSeatAvailability,
};