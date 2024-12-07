const express = require('express');
const router = express.Router();
const validateAdminApiKey = require('../middleware/adminMiddleware');
const { addTrain, updateTrain, deleteTrain, getAllTrains } = require('../controllers/adminController');

router.get('/train', validateAdminApiKey, getAllTrains);
router.post('/train', validateAdminApiKey, addTrain);
router.put('/train/:trainId', validateAdminApiKey, updateTrain);
router.delete('/train/:trainId', validateAdminApiKey, deleteTrain);

module.exports = router;
