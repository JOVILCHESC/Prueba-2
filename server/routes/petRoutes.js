// routes/petRoutes.js
const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

// Ruta para obtener todas las mascotas disponibles para adopción
router.get('/available-pets', petController.getAvailablePets);

module.exports = router;
