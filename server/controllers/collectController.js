
const { Pet, PetPhoto, User, Organization, Sede, Collect, CollectImage } = require('../models');
const { Op } = require('sequelize');
module.exports.iniciarColecta = async (req, res) => {
  try {
    // Obtener información del usuario autenticado
    const userId = req.userId;
    const user = await User.findByPk(userId, {
      include: [Organization], // Incluye la asociación con Organization
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    // Obtener la organización asociada al usuario
    const organization = user.Organization;

    if (!organization) {
      return res.status(404).json({ success: false, message: 'Organización no encontrada para este usuario' });
    }

    // Verificar si la mascota existe
    const pet = await Pet.findByPk(req.body.petId, {
      include: [Sede], // Incluye la asociación con Sede
    });

    if (!pet) {
      return res.status(404).json({ success: false, message: 'Mascota no encontrada' });
    }

    // Crea la colecta con las asociaciones adecuadas
    const nuevaColecta = await Collect.create({
      amountRaised: req.body.amount,
      targetAmount: req.body.targetAmount,
      deadline: req.body.deadline,
      userId,
      organizationId: organization.id,
      petId: req.body.petId,
      sedeId: pet.Sede ? pet.Sede.id : null, // Agrega la sedeId de la mascota a la colecta
    });

    res.status(201).json({ success: true, colecta: nuevaColecta });
  } catch (error) {
    console.error('Error al iniciar la colecta:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};




// En tu controlador o ruta para obtener todas las mascotas con colectas
module.exports.getAllPetsWithCollects = async (req, res) => {
  try {
    const pets = await Pet.findAll({
      include: {
        model: Collect,
        attributes: ['id', 'amountRaised', 'targetAmount', 'deadline'],
      },
    });

    res.status(200).json({ success: true, pets });
  } catch (error) {
    console.error('Error al obtener todas las mascotas con colectas:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};




// En tu controlador o ruta para obtener solamente las mascotas con colectas iniciadas
module.exports.getPetsWithActiveCollects = async (req, res) => {
  try {
    const petsWithActiveCollects = await Pet.findAll({
      include: {
        model: Collect,
        attributes: ['id', 'amountRaised', 'targetAmount', 'deadline'],
        where: {
          deadline: { [Op.gt]: new Date() }, // Filtrar colectas activas
        },
      },
    });

    res.status(200).json({ success: true, pets: petsWithActiveCollects });
  } catch (error) {
    console.error('Error al obtener mascotas con colectas:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};









// Obtener las colectas a partir de la mascota seleccionada
// En tu controlador o ruta para obtener las colectas de una mascota específica
module.exports.getCollectsForPet = async (req, res) => {
  const { petId } = req.params;

  try {
    const petWithCollects = await Pet.findByPk(petId, {
      include: {
        model: Collect,
        attributes: ['id', 'amountRaised', 'targetAmount', 'deadline'],
        where: {
          deadline: { [Op.gt]: new Date() }, // Filtrar colectas activas
        },
      },
    });

    if (!petWithCollects) {
      return res.status(404).json({ success: false, message: 'Mascota no encontrada' });
    }

    res.status(200).json({
      success: true,
      pet: {
        id: petWithCollects.id,
        name: petWithCollects.name,
        // Otros campos de la mascota que desees enviar
      },
      collects: petWithCollects.Collects,
    });
  } catch (error) {
    console.error('Error al obtener colectas de la mascota:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};




module.exports.uploadCollectImage = async (req, res) => {
  try {
    // Aquí puedes acceder a la imagen subida usando req.file
    const { filename, path } = req.file;
    const { collectId } = req.body;

    // Puedes almacenar la información de la imagen en la base de datos si es necesario
    await CollectImage.create({
      filename,
      path,
      collectId,
      // Otros campos según los detalles específicos que necesites.
    });

    res.status(201).json({ message: 'Imagen de la colecta subida exitosamente' });
  } catch (error) {
    console.error('Error al subir la imagen de la colecta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
