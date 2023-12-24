// controllers/appointmentFormController.js
const AppointmentForm = require('../models/appointmentForm');

module.exports.createAppointmentForm = async (req, res) => {
  try {
    const { adoptanteId } = req.body; // Asegúrate de tener el adoptanteId disponible
    const { fecha, hora, lugar, notas } = req.body;

    const appointmentForm = await AppointmentForm.create({
      adoptanteId,
      fecha,
      hora,
      lugar,
      notas,
    });

    res.status(201).json({ success: true, appointmentForm });
  } catch (error) {
    console.error(`Error al crear el formulario de cita: ${error.message}`);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};
