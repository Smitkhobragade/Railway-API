const express = require('express');
const { getSeatAvailability } = require('../controllers/trainController');
const router = express.Router();

router.post('/seats', getSeatAvailability);


module.exports = router;
