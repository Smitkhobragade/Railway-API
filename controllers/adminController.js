const db = require('../utils/db');

const addTrain = async (req, res) => {
  const { trainName, source, destination, totalSeats } = req.body;

  try {
    const query = `
      INSERT INTO trains (train_name, source, destination, total_seats, available_seats)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [trainName, source, destination, totalSeats, totalSeats]);

    res.status(201).json({ message: 'Train added successfully', trainId: result.insertId });
  } catch (error) {
    console.error('Error adding train:', error.message);
    res.status(500).json({ error: 'Failed to add train' });
  }
};

const updateTrain = async (req, res) => {
  const { trainId } = req.params;
  const { trainName, source, destination, totalSeats } = req.body;

  try {
    const [train] = await db.query('SELECT total_seats, available_seats FROM trains WHERE id = ?', [trainId]);

    if (!train.length) {
      return res.status(404).json({ error: 'Train not found' });
    }

    const { total_seats: currentTotalSeats, available_seats: currentAvailableSeats } = train[0];

    const newAvailableSeats =
      totalSeats > currentTotalSeats
        ? currentAvailableSeats + (totalSeats - currentTotalSeats)
        : currentAvailableSeats;

    const query = `
      UPDATE trains
      SET train_name = ?, source = ?, destination = ?, total_seats = ?, available_seats = ?
      WHERE id = ?
    `;
    const [result] = await db.query(query, [trainName, source, destination, totalSeats, newAvailableSeats, trainId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Train not found' });
    }

    res.status(200).json({ message: 'Train updated successfully' });
  } catch (error) {
    console.error('Error updating train:', error.message);
    res.status(500).json({ error: 'Failed to update train' });
  }
};

const deleteTrain = async (req, res) => {
  const { trainId } = req.params;

  try {
    const query = 'DELETE FROM trains WHERE id = ?';
    const [result] = await db.query(query, [trainId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Train not found' });
    }

    res.status(200).json({ message: 'Train deleted successfully' });
  } catch (error) {
    console.error('Error deleting train:', error.message);
    res.status(500).json({ error: 'Failed to delete train' });
  }
};

const getAllTrains = async (req, res) => {
    try {
      const query = 'SELECT * FROM trains';
      const [trains] = await db.query(query);
  
      if (trains.length === 0) {
        return res.status(404).json({ message: 'No trains found' });
      }
  
      res.status(200).json({ trains });
    } catch (error) {
      console.error('Error fetching trains:', error.message);
      res.status(500).json({ error: 'Failed to fetch trains' });
    }
  };

module.exports = {
  addTrain,
  updateTrain,
  deleteTrain,
  getAllTrains,
};
