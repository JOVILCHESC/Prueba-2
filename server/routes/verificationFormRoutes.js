const express = require('express');
const router = express.Router();
const { createVerificationForm } = require('../controllers/verificationFormController');
const { verifyToken } = require('../middlewares/authMiddleware'); // Middleware para autenticación

// Ruta para crear el formulario de verificación
router.post('/verification-form', verifyToken, createVerificationForm);

module.exports = router;
