// routes/fundraising.js

const express = require('express');
const router = express.Router();
const fundraisingController = require('../controllers/fundraisingController');
const { verifyToken } = require('../middlewares/authMiddleware');
// const { contributeToFundraising } = require('../controllers/contributionsController');
const { contributionUpload } = require('../index'); // Asegúrate de tener la ruta correcta


// Ruta para crear una nueva colecta
router.post('/create', verifyToken, fundraisingController.createFundraising);
// obetenr todas las colectas
router.get('/active', fundraisingController.getActiveFundraisings);
// Ruta para aportar a la colecta
router.post('/:fundraisingId/contribute', contributionUpload.single('transactionProof'), fundraisingController.contributeToFundraising);
// Ruta para obtener detalles de una colecta
router.get('/:fundraisingId', fundraisingController.getFundraisingDetails);

module.exports = router;
