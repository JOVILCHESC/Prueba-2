
// const { adoptedPet, Pet, User } = require('../models');

// module.exports.approveAdoption = async (req, res) => {
//   try {
//     console.log('Body:', req.body);
//     const { petId, adoptanteUserId } = req.body;

//     // Verificar si la mascota y el usuario existen
//     const pet = await Pet.findByPk(petId);
//     const user = await User.findByPk(adoptanteUserId);

//     if (!pet || !user) {
//       return res.status(400).json({ success: false, message: 'Mascota o usuario no encontrados.' });
//     }

//     // Verificar si ya se ha aprobado la adopción
//     const existingAdoption = await adoptedPet.findOne({
//       where: {
//         petId,
//         userId: adoptanteUserId,
//       },
//     });

//     if (existingAdoption) {
//       return res.status(400).json({ success: false, message: 'La adopción ya ha sido aprobada.' });
//     }

//     // Crear la relación en la tabla adopted_pet
//     const adoption = await adoptedPet.create({
//       petId,
//       userId: adoptanteUserId,
//     });

//     res.status(201).json({ success: true, adoption });
//   } catch (error) {
//     console.error('Error al aprobar la adopción:', error.message);
//     res.status(500).json({ success: false, message: 'Error interno del servidor.' });
//   }
// };
const { adoptedPet, Pet, User, Sede } = require('../models');

module.exports.approveAdoption = async (req, res) => {
  try {
    console.log('Body:', req.body);
    const { petId, adoptanteUserId } = req.body;

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
    const user = await User.findByPk(adoptanteUserId);

    if (!pet || !user) {
      return res.status(400).json({ success: false, message: 'Mascota o usuario no encontrados.' });
    }

    // Verificar si la adopción ya ha sido aprobada
    const existingAdoption = await adoptedPet.findOne({
      where: {
        petId,
        userId: adoptanteUserId,
      },
    });

    if (existingAdoption) {
      return res.status(400).json({ success: false, message: 'La adopción ya ha sido aprobada anteriormente.' });
    }

    // Crear la relación en la tabla adopted_pet
    const adoption = await adoptedPet.create({
      petId,
      userId: adoptanteUserId,
      sedeId: pet.Sede ? pet.Sede.id : null, // Obtén el sedeId si existe, de lo contrario, usa null
    });

    res.status(201).json({ success: true, adoption, sede: pet.Sede }); // Incluye la información de la sede en la respuesta
  } catch (error) {
    console.error('Error al aprobar la adopción:', error.message);
    res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
};



module.exports.getAdoptedPetsByUser = async (req, res) => {
  try {
    const userId = req.userId;

    // Buscar las mascotas adoptadas por el usuario
    const adoptedPets = await adoptedPet.findAll({
      where: { userId },
      include: [{ model: Pet, include: 'Sede', }, User,], // Incluir información sobre la mascota y su sede
    });

    res.status(200).json({ success: true, adoptedPets });
  } catch (error) {
    console.error('Error al obtener las mascotas adoptadas:', error.message);
    res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
};