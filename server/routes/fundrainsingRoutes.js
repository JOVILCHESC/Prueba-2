// routes/fundraising.js

const express = require('express');
const router = express.Router();
const fundraisingController = require('../controllers/fundraisingController');
const { verifyToken } = require('../middlewares/authMiddleware');
// const { contributeToFundraising } = require('../controllers/contributionsController');
// const { contributionUpload } = require('../index'); // Asegúrate de tener la ruta correcta
const { contributionUpload } = require('../multerConfig'); // Asegúrate de tener la ruta correcta
// Nueva ruta para obtener colectas iniciadas por el usuario
router.get('/user-fundraisings', verifyToken, fundraisingController.getUserFundraisings);
//eliminar ruta
router.put('/fundraising/:fundraisingId/edit', fundraisingController.editFundraising);
// Ruta para crear una nueva colecta
router.post('/create', verifyToken, fundraisingController.createFundraising);
// obetenr todas las colectas
router.get('/active', fundraisingController.getActiveFundraisings);
// Ruta para aportar a la colecta
router.post('/:fundraisingId/contribute', contributionUpload.single('transactionProof'), fundraisingController.contributeToFundraising);
// Ruta para obtener detalles de una colecta
router.get('/:fundraisingId', fundraisingController.getFundraisingDetails);
//Ruta para actualizar una colecta por su id
// router.put('/fundraising/:fundraisingId/edit', fundraisingController.editFundraising);

module.exports = router;
