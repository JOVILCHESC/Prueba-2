// routes/appointmentFormRoutes.js
const express = require('express');
const router = express.Router();
const { createAppointmentForm, getUserAppointments } = require('../controllers/appointmentFormController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/create-appointment-form', verifyToken, createAppointmentForm);

router.get('/appointments/:userId', verifyToken, getUserAppointments);

module.exports = router;
