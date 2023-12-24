const express = require('express');
const router = express.Router();
const { createVerificationForm, getPosiblesAdoptantes } = require('../controllers/verificationFormController');
const { verifyToken } = require('../middlewares/authMiddleware'); // Middleware para autenticación

// Ruta para crear el formulario de verificación
router.post('/verification-form', verifyToken, createVerificationForm);
// Ruta para obtener posibles adoptantes
router.get('/posibles-adoptantes/:petId', getPosiblesAdoptantes);

module.exports = router;
