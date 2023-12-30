const express = require('express');
const router = express.Router();
const vaccineFormController = require('../controllers/vaccineFormController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Ruta para agregar una vacuna
router.post('/vaccine/add', verifyToken, vaccineFormController.addVaccine);

module.exports = router;
