const { VaccineForm, User, Pet, Sede } = require('../models');

module.exports.addVaccine = async (req, res) => {
  try {
    const { petId, userId, vaccineName, observation, vaccineDate, vaccinationLocation, vaccinationLocationAddress, vaccinatorName } = req.body;

    // Verificar si la mascota y el usuario existen
    const pet = await Pet.findByPk(petId, {
      include: [
        {
          model: Sede,
          attributes: ['id', 'name'],
          as: 'Sede',
        },
      ],
    });
    const user = await User.findByPk(userId);

    if (!pet || !user) {
      return res.status(400).json({ success: false, message: 'Mascota o usuario no encontrados.' });
    }

    // Verificar si ya existe un formulario de vacuna para la misma mascota y nombre de vacuna
    const existingVaccine = await VaccineForm.findOne({
      where: {
        petId,
        vaccineName,
      },
    });

    if (existingVaccine) {
      return res.status(400).json({ success: false, message: 'Ya existe un formulario de vacuna para esta mascota y nombre de vacuna.' });
    }

    // Crear el formulario de vacuna
    const vaccineForm = await VaccineForm.create({
      petId,
      userId,
      vaccineName,
      observation,
      vaccineDate,
      vaccinationLocation,
      vaccinationLocationAddress,
      vaccinatorName,
      sedeId: pet.Sede ? pet.Sede.id : null,
    });

    res.status(201).json({ success: true, vaccineForm, sede: pet.Sede });
  } catch (error) {
    console.error('Error al agregar la vacuna:', error.message);
    res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
};
