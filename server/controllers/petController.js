// // controllers/petController.js

// const { Pet, PetPhoto, User, Organization } = require('../models');
// const path = require('path');
// module.exports.createPetWithPhotos = async (req, res) => {
//   try {
//     console.log('req.body:', req.body);
//     console.log('req.files:', req.files);
//     // Obtener información del usuario autenticado
//     const userId = req.userId;
//     const user = await User.findByPk(userId, {
//       include: [Organization], // Incluye la asociación con Organization
//     });
//     const { name, species, race, age, sex, date_born, description } = req.body;

//     // Crear una nueva mascota
//     const newPet = await Pet.create({
//       name,
//       species,
//       race,
//       age,
//       sex,
//       date_born,
//       description,
//       userId: userId, // Asociar la mascota con el usuario autenticado
//       organizationId: user.Organization.id,
//     });
//     console.log('Mascota creada:', newPet);

//     // Asociar la mascota con el usuario en la base de datos
//     // const user = await User.findByPk(userId);
  
//     if (user) {
//       console.log('Usuario encontrado:', user);
//       try {
//         await user.addPet(newPet);
//         console.log('Asociación exitosa.');
//       } catch (associationError) {
//         console.error('Error al asociar la mascota al usuario:', associationError);
//         throw associationError;
//       }
//     } else {
//       console.error('Usuario no encontrado.');
//     }

//     // Verificar si hay archivos adjuntos
//     if (req.files && req.files.length > 0) {
      
//       // Crear registros de fotos asociadas a la mascota
//       const petPhotos = req.files.map((file) => ({
//         filename: file.filename,
//         // path: file.path,
//         path: path.join('uploads', file.filename),
//         petId: newPet.id,
//       }));
//       await PetPhoto.bulkCreate(petPhotos);
//     }
//     console.log('Archivos recibidos:', req.files);

//     console.log('Mascota creada exitosamente:', newPet);

//     res.status(201).json({ success: true, message: 'Mascota creada exitosamente', pet: newPet });
//   } catch (error) {
//     console.error(`Error creating pet: ${error.message}`);
//     res.status(500).json({ success: false, message: 'Error interno del servidor' });
//   }
// };


// controllers/petController.js

const { Pet, PetPhoto, User, Organization, Sede } = require('../models');
const path = require('path');

module.exports.createPetWithPhotos = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);

    // Obtener información del usuario autenticado
    const userId = req.userId;
    const user = await User.findByPk(userId, {
      include: [Organization], // Incluye la asociación con Organization
    });

    const { name, species, race, age, sex, date_born, description, createSede, sedeData } = req.body;

    // Crear una nueva mascota
    const newPet = await Pet.create({
      name,
      species,
      race,
      age,
      sex,
      date_born,
      description,
      userId: userId, // Asociar la mascota con el usuario autenticado
      organizationId: user.Organization.id,
    });
    console.log('Mascota creada:', newPet);

    if (user) {
      console.log('Usuario encontrado:', user);
      try {
        await user.addPet(newPet);
        console.log('Asociación exitosa.');
      } catch (associationError) {
        console.error('Error al asociar la mascota al usuario:', associationError);
        throw associationError;
      }
    } else {
      console.error('Usuario no encontrado.');
    }

    // Si se debe crear una nueva sede
    if (createSede && sedeData) {
      // Obtener organizationId del usuario
      const organizationId = user.Organization.id;

      // Crear la sede asociada a la organización y al usuario
      const nuevaSede = await Sede.create({ ...sedeData, organizationId, userId });

      // Asociar la sede con la mascota
      await newPet.setSede(nuevaSede);
    }

    // Verificar si hay archivos adjuntos
    if (req.files && req.files.length > 0) {
      // Crear registros de fotos asociadas a la mascota
      const petPhotos = req.files.map((file) => ({
        filename: file.filename,
        // path: file.path,
        path: path.join('uploads', file.filename),
        petId: newPet.id,
      }));
      await PetPhoto.bulkCreate(petPhotos);
    }
    console.log('Archivos recibidos:', req.files);

    console.log('Mascota creada exitosamente:', newPet);

    res.status(201).json({ success: true, message: 'Mascota creada exitosamente', pet: newPet });
  } catch (error) {
    console.error(`Error creating pet: ${error.message}`);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};












// petController.js

// Controlador para obtener todas las mascotas disponibles para adoptar
module.exports.getAvailablePets = async (req, res) => {
  try {
    // Buscar todas las mascotas disponibles para adopción
    const availablePets = await Pet.findAll({
      where: {
        availableForAdoption: true,
      },
      include: [
        {
          model: PetPhoto, // Incluir las fotos asociadas a cada mascota
        },
        {
          model: User, // Incluir información del usuario
          include: Organization, // Incluir información de la organización del usuario
        },
      ],
    });

    res.status(200).json({ success: true, availablePets });
  } catch (error) {
    console.error(`Error obteniendo mascotas disponibles: ${error.message}`);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};







// petController.js

// Controlador para adoptar una mascota
exports.adoptPet = async (req, res) => {
    try {
      const { petId, adopterUserId } = req.body;
  
      // Busca la mascota por ID
      const petToAdopt = await Pet.findByPk(petId);
  
      if (!petToAdopt) {
        return res.status(404).json({ success: false, message: 'Mascota no encontrada' });
      }
  
      // Realiza la lógica de adopción, por ejemplo, actualiza el estado de disponibilidad
      petToAdopt.availableForAdoption = false;
      petToAdopt.adopterUserId = adopterUserId; // Podrías almacenar el ID del usuario adoptante
  
      await petToAdopt.save();
  
      res.status(200).json({ success: true, message: 'Mascota adoptada exitosamente' });
    } catch (error) {
      console.error('Error al adoptar la mascota:', error);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  };
  