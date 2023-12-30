const express = require('express');
const router = express.Router();
const {approveAdoption, getAdoptedPetsByUser} = require('../controllers/adoptedPetController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Otras rutas para petController y userController

// Ruta para aprobar adopción
router.post('/aprobar-adopcion',verifyToken, approveAdoption);
// Ruta para obtener las mascotas adoptadas por un usuario
router.get('/adopted-by-user/:userId', verifyToken, getAdoptedPetsByUser);

module.exports = router;
