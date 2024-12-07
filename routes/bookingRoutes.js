const express = require('express');
const { getBookingDetails, bookSeat } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware'); 

const router = express.Router();

router.post('/:trainId/book', authMiddleware, bookSeat);
router.get('/booking/:bookingId', authMiddleware, getBookingDetails);

module.exports = router;
