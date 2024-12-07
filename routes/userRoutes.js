const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getSeatAvailability} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/seats', getSeatAvailability);

module.exports = router;
