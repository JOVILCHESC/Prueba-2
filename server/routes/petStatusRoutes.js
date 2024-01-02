// routes/petStatusRoutes.js
const express = require('express');
const router = express.Router();
const petStatusController = require('../controllers/petStatusController');
const { petStatusImageUpload } = require('../multerConfig');
const { verifyToken } = require('../middlewares/authMiddleware');

// Ruta para crear un nuevo estado de mascota
router.post('/:id/add', petStatusImageUpload.array('images', 5), verifyToken, petStatusController.createPetStatus);

module.exports = router;
