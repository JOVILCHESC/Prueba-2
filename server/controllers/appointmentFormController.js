
// // controllers/appointmentFormController.js
// const { AppointmentForm, User, Pet, Sede } = require('../models');

// module.exports.createAppointmentForm = async (req, res) => {
//   try {
//     const { fecha, hora, lugar, motive, petId } = req.body;

//     // Obtener el adoptanteId del objeto del usuario autenticado
//     const adoptanteId = req.userId;

//     // Verifica la existencia de la mascota y obtén la sede asociada
//     const mascota = await Pet.findByPk(petId, {
//       include: [
//         {
//           model: Sede,
//           attributes: ['id'], // Puedes incluir más atributos según sea necesario
//         },
//       ],
//     });

//     if (!mascota) {
//       return res.status(400).json({ success: false, message: 'Mascota no encontrada.' });
//     }

//     const sedeId = mascota.Sede.id; // Así es como obtienes el id de la sede asociada

//     // Crea la cita asociada al adoptante, la mascota y la sede
//     const cita = await AppointmentForm.create({
//       date: fecha,
//       hour: hora,
//       place: lugar,
//       motive: motive,
//       userId: adoptanteId,
//       petId: petId,
//       sedeId: sedeId, // Agrega el sedeId a la cita
//     });

//     res.status(201).json({ success: true, cita });
//   } catch (error) {
//     console.error('Error al crear la cita:', error.message);
//     res.status(500).json({ success: false, message: 'Error interno del servidor.' });
//   }
// };


// controllers/appointmentFormController.js
const { AppointmentForm, User, Pet, Sede } = require('../models');

module.exports.createAppointmentForm = async (req, res) => {
  try {
    const { fecha, hora, lugar, motive, petId, adoptanteUserId } = req.body;

    // Verifica la existencia del usuario adoptante
    const adoptante = await User.findByPk(adoptanteUserId);
    if (!adoptante) {
      return res.status(400).json({ success: false, message: 'Usuario adoptante no encontrado.' });
    }

    // Verifica la existencia de la mascota y obtén la sede asociada
    const mascota = await Pet.findByPk(petId, {
      include: [
        {
          model: Sede,
          attributes: ['id'], // Puedes incluir más atributos según sea necesario
        },
      ],
    });

    if (!mascota) {
      return res.status(400).json({ success: false, message: 'Mascota no encontrada.' });
    }

    const sedeId = mascota.Sede.id; // Así es como obtienes el id de la sede asociada

    // Crea la cita asociada al adoptante, la mascota y la sede
    const cita = await AppointmentForm.create({
      date: fecha,
      hour: hora,
      place: lugar,
      motive: motive,
      userId: adoptanteUserId, // Usa adoptanteUserId como el ID del usuario adoptante
      petId: petId,
      sedeId: sedeId, // Agrega el sedeId a la cita
    });

    res.status(201).json({ success: true, cita });
  } catch (error) {
    console.error('Error al crear la cita:', error.message);
    res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
};



module.exports.getUserAppointments = async (req, res) => {
  try {
    const userId = req.userId; // Obtén el ID del usuario autenticado
    console.log('UserId:', userId);
    // Obtén las citas asociadas al usuario con detalles de mascota y sede
    const userAppointments = await AppointmentForm.findAll({
      where: { userId },
      include: [
        { model: Pet, attributes: ['name'] },
        { model: Sede, attributes: ['name'] },
      ],
    });
    console.log('User Appointments:', userAppointments);
    res.status(200).json({ success: true, appointments: userAppointments });
  } catch (error) {
    console.error('Error al obtener citas del usuario:', error.message);
    res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
};

