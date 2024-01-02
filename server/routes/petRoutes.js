// routes/petRoutes.js
const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const { verifyToken } = require('../middlewares/authMiddleware');
// const { upload } = require('../index'); // Ajusta la ruta según la ubicación de tu index.js
const { upload } = require('../multerConfig'); // Cambia la ruta según tu estructura

// Ruta para obtener todas las mascotas disponibles para adopción
router.get('/available-pets', petController.getAvailablePets);
// Ruta para obtener todas las mascotas del usuario autenticado
router.get('/user/pets', verifyToken, petController.getUserPets);

// Ruta para obtener una mascota por ID
router.get('/pets/:petId', petController.getPetById);

// // Ruta para actualizar una mascota del usuario autenticado
// router.put('/user/pets/:petId', verifyToken, petController.updateUserPet);

// // // Ruta para actualizar una mascota del usuario autenticado
router.put('/user/pets/:petId', verifyToken, upload.array('petPhotos', 5), petController.updateUserPet);


// Ruta para eliminar una mascota del usuario autenticado
router.delete('/pets/:petId', verifyToken, petController.deleteUserPet);
module.exports = router;
