// routes.js
const express = require('express');
const colectaController = require('../controllers/collectController');
const {verifyToken} = require('../middlewares/authMiddleware')

const router = express.Router();

// Otras rutas...

// Ruta para iniciar una colecta
router.post('/colecta/iniciar', verifyToken, colectaController.iniciarColecta);
// Ruta para obtener la lista de todas las mascotas y de mascotas que se le inicio un colecta
router.get('/lista/colecta', colectaController.getAllPetsWithCollects);
// Ruta para obtener solamente la lista de mascotas que se le inicio un colecta
router.get('/active-collects', colectaController.getPetsWithActiveCollects);

// Ruta para obtener la colecta a partir de la mascota seleccionada
router.get('/collectByPet/:petId', colectaController.getCollectsForPet);
module.exports = router;
