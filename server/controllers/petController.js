// controllers/petController.js

const { Pet, PetPhoto, User, Organization, Sede, VerificationForm } = require('../models');
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

if (createSede && sedeData) {
  // Obtener organizationId del usuario
  const organizationId = user.Organization.id;

  try {
    // Crear la sede asociada a la organización y al usuario
    const nuevaSede = await Sede.create({
      name: sedeData.name,
      street: sedeData.street,
      city: sedeData.city,
      state: sedeData.state,
      postalCode: sedeData.postalCode,
      phoneNumber: sedeData.phoneNumber,
      email: sedeData.email,
      openingTime: sedeData.openingTime,
      closingTime: sedeData.closingTime,
      organizationId,
      userId,
    });

    // Asociar la sede con la mascota
    await newPet.setSede(nuevaSede);

    console.log('Sede creada exitosamente:', nuevaSede);
  } catch (error) {
    console.error('Error al crear la sede:', error);
  }
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







// // Controlador para obtener todas las mascotas creadas por el usuario u organización autenticada
// module.exports.getUserPets = async (req, res) => {
//   try {
//     // Obtener el ID del usuario autenticado
//     const userId = req.userId;

//     // Verificar si el usuario está autenticado
//     if (!userId) {
//       return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
//     }

//     // Buscar todas las mascotas creadas por el usuario u organización
//     const userPets = await Pet.findAll({
//       where: {
//         userId: userId, // Filtrar por el ID del usuario autenticado
//       },
//       include: [
//         {
//           model: PetPhoto, // Incluir las fotos asociadas a cada mascota
//         },
//         {
//           model: User, // Incluir información del usuario
//           include: Organization, // Incluir información de la organización del usuario
//         },
//         {
//           model: Sede, // Asegurar que la relación con la sede se incluya
//         },
        
        
//       ],
//     });

//     res.status(200).json({ success: true, userPets });
//   } catch (error) {
//     console.error(`Error obteniendo mascotas del usuario: ${error.message}`);
//     res.status(500).json({ success: false, message: 'Error interno del servidor' });
//   }
// };




// Controlador para obtener todas las mascotas creadas por el usuario u organización autenticada
module.exports.getUserPets = async (req, res) => {
  try {
    // Obtener el ID del usuario autenticado
    const userId = req.userId;

    // Verificar si el usuario está autenticado
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
    }

    // Buscar todas las mascotas creadas por el usuario u organización
    const userPets = await Pet.findAll({
      where: {
        userId: userId, // Filtrar por el ID del usuario autenticado
      },
      include: [
        PetPhoto, // Incluir las fotos asociadas a cada mascota
        {
          model: User, // Incluir información del usuario
          include: Organization, // Incluir información de la organización del usuario
        },
        Sede, // Asegurar que la relación con la sede se incluya
        VerificationForm, // Incluir información del formulario de verificación
      ],
    });

    res.status(200).json({ success: true, userPets });
  } catch (error) {
    console.error(`Error obteniendo mascotas del usuario: ${error.message}`);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};






// Controlador para actualizar una mascota creada por el usuario u organización autenticada
module.exports.updateUserPet = async (req, res) => {
  try {
    // Obtener el ID de la mascota desde los parámetros de la solicitud
    const petId = req.params.petId;

    // Verificar si la mascota existe
    const pet = await Pet.findByPk(petId, {
      include: [PetPhoto, Sede, { model: Organization, include: [User] }],
    });

    if (!pet) {
      return res.status(404).json({ success: false, message: 'Mascota no encontrada' });
    }

    // Verificar si el usuario autenticado es el propietario de la mascota
    if (pet.userId !== req.userId) {
      return res.status(403).json({ success: false, message: 'No tienes permisos para actualizar esta mascota' });
    }

    // Conservar las imágenes existentes asociadas a la mascota
    const existingPhotos = pet.PetPhotos;

    // Obtener las fotos del formulario
    const petPhotosFromForm = req.files || [];

    // // Crear registros de fotos asociadas a la mascota
    // const petPhotos = petPhotosFromForm.map((file) => ({
    //   filename: file.originalname || 'defaultFilename',
    //   path: path.join('uploads', file.filename),
    //   petId,
    // }));
    const petPhotos = petPhotosFromForm.map((file) => ({
      filename: file.originalname ? file.originalname : 'defaultFilename',
      path: path.join('uploads', file.filename),
      petId,
    }));
    
    


    // Conservar las imágenes existentes y agregar nuevas imágenes
    const allPetPhotos = [...existingPhotos, ...petPhotos];

    // Actualizar la información de la mascota excluyendo el campo 'photos'
    const { name, species, race, age, sex, date_born, description, sedeData, userData, organizationData } = req.body;
    console.log('Datos recibidos en el servidor:', req.body);
    await pet.update({ name, species, race, age, sex, date_born, description, sedeData, userData, organizationData });

    // Si también necesitas actualizar los datos de la sede, puedes hacerlo de manera similar
    if (sedeData) {
      // Verificar si ya existe una sede asociada a la mascota
      const sede = pet.Sede;

      if (sede) {
        // Si existe, actualizar los datos de la sede
        await sede.update(sedeData);
      } else {
        // Si no existe, crear una nueva sede asociada a la mascota
        await Sede.create({ ...sedeData, petId });
      }
    }
    console.log('Datos de fotos de mascotas:', petPhotos);
    // Actualizar registros de fotos asociadas a la mascota
    await PetPhoto.bulkCreate(allPetPhotos);

    // También puedes actualizar los datos del usuario y la organización si es necesario
    if (userData) {
      // Actualizar la información del usuario
      await pet.Organization.User.update(userData);
    }

    if (organizationData) {
      // Actualizar la información de la organización
      await pet.Organization.update(organizationData);
    }

    res.status(200).json({ success: true, message: 'Mascota actualizada exitosamente' });
  } catch (error) {
    console.error(`Error al actualizar la mascota: ${error.message}`);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};











// // Controlador para eliminar una mascota creada por el usuario u organización autenticada
module.exports.deleteUserPet = async (req, res) => {
  try {
    // Obtener el ID de la mascota desde los parámetros de la solicitud
    // const petId = req.params.id;
    const petId = req.params.petId;

    // Verificar si la mascota existe
    const pet = await Pet.findByPk(petId);

    if (!pet) {
      return res.status(404).json({ success: false, message: 'Mascota no encontrada' });
    }

    // Verificar si el usuario autenticado es el propietario de la mascota
    if (pet.userId !== req.userId) {
      return res.status(403).json({ success: false, message: 'No tienes permisos para eliminar esta mascota' });
    }

    // Eliminar las fotos asociadas a la mascota
    await PetPhoto.destroy({ where: { petId } });

    // Eliminar la mascota
    await Pet.destroy({ where: { id: petId } });

    res.status(200).json({ success: true, message: 'Mascota eliminada exitosamente' });
  } catch (error) {
    console.error(`Error al eliminar la mascota: ${error.message}`);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

  


module.exports.getPetById = async (req, res) => {
  try {
    const petId = req.params.petId;

    // Verificar si se proporcionó un ID válido
    if (!petId) {
      return res.status(400).json({ success: false, message: 'ID de mascota no válido' });
    }

    // Buscar la mascota por su ID
    const pet = await Pet.findOne({
      where: {
        id: petId,
      },
      include: [
        PetPhoto,
        {
          model: User,
          include: Organization,
        },
        Sede,
        VerificationForm,
      ],
    });

    // Verificar si se encontró la mascota
    if (!pet) {
      return res.status(404).json({ success: false, message: 'Mascota no encontrada' });
    }

    res.status(200).json({ success: true, pet });
  } catch (error) {
    console.error(`Error obteniendo mascota por ID: ${error.message}`);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};