// routes/appointmentFormRoutes.js
const express = require('express');
const router = express.Router();
const { createAppointmentForm } = require('../controllers/appointmentFormController');

router.post('/create-appointment-form', createAppointmentForm);

module.exports = router;
