const db = require('../utils/db');

const bookSeat = async (req, res) => {
  const { trainId } = req.params;
  const { userId } = req.user; 
  const connection = await db.getConnection(); 

  try {
    await connection.beginTransaction();

    const [train] = await connection.query(
      'SELECT available_seats FROM trains WHERE id = ? FOR UPDATE',
      [trainId]
    );

    if (!train || train.length === 0) {
      await connection.rollback(); 
      return res.status(404).json({ error: 'Train not found' });
    }

    if (train[0].available_seats <= 0) {
      await connection.rollback(); 
      return res.status(400).json({ error: 'No available seats' });
    }

    const updateSeatsQuery = 'UPDATE trains SET available_seats = available_seats - 1 WHERE id = ?';
    await connection.query(updateSeatsQuery, [trainId]);

    const bookingQuery = 'INSERT INTO bookings (user_id, train_id) VALUES (?, ?)';
    const [result] = await connection.query(bookingQuery, [userId, trainId]);

    await connection.commit();

    res.status(200).json({ message: 'Seat booked successfully', bookingId: result.insertId });
  } catch (error) {
    await connection.rollback();
    console.error('Error booking seat:', error.message);
    res.status(500).json({ error: 'Failed to book seat' });
  } finally {
    connection.release();
  }
};

const getBookingDetails = async (req, res) => {
  const { bookingId } = req.params;
  const { userId } = req.user;
  try {
    const [booking] = await db.query(
      'SELECT b.id, b.user_id, b.train_id, t.train_name, t.source, t.destination, t.total_seats, t.available_seats ' +
      'FROM bookings b ' +
      'JOIN trains t ON b.train_id = t.id ' +
      'WHERE b.id = ? AND b.user_id = ?',
      [bookingId, userId]
    );

    if (!booking || booking.length === 0) {
      return res.status(404).json({ error: 'Booking not found or you are not authorized to view this booking' });
    }

    res.status(200).json({ bookingDetails: booking[0] });
  } catch (error) {
    console.error('Error fetching booking details:', error.message);
    res.status(500).json({ error: 'Failed to get booking details' });
  }
};

module.exports = {
  bookSeat,
  getBookingDetails,
};

