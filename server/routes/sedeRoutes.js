// routes.js
const express = require('express');
const router = express.Router();
const sedeController = require('../controllers/sedeController');
const {verifyToken} = require('../middlewares/authMiddleware')
// Rutas para sedes
// router.post('/organizations/:organizationId/sedes', verifyToken, sedeController.createSede);
router.post('/sedes', verifyToken, sedeController.createSede);
// router.get('/all-sedes', sedeController.getSedesByOrganization);
// router.get('/organizations/:organizationId/sedes', sedeController.getSedesByOrganization);
router.get('/all-sedes', verifyToken, sedeController.getSedesByUserOrganization);

// router.put('/sedes/:sedeId', sedeController.updateSede);
// router.delete('/sedes/:sedeId', sedeController.deleteSede);

module.exports = router;
