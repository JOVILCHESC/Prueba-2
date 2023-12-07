
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserByEmail } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Ruta para el registro de usuario
router.post('/register', registerUser);

// Ruta para el inicio de sesión
router.post('/login', loginUser);
//obtener usuario por id
// Ruta para obtener un usuario por su email
router.get('/user/:email', getUserByEmail);

// Ruta protegida para obtener información del usuario
router.get('/mainUser', verifyToken, (req, res) => {
  // Puedes acceder al id del usuario usando req.userId
  // Consulta la base de datos o realiza cualquier acción necesaria aquí
  res.json({ message: 'Ruta protegida, usuario autenticado.', userId: req.userId });
});

module.exports = router;
