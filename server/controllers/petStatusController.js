const { PetStatus, PetStatusImage } = require('../models');
const { petStatusImageUpload } = require('../multerConfig');  // Ajusta la ruta según la ubicación de tu multerConfig
const createPetStatus = async (req, res) => {
    try {
      const { userId, petId, description } = req.body;
      
      const petStatus = await PetStatus.create({
        userId,
        petId,
        description,
      });
  
      // Verificar si hay archivos adjuntos
      if (req.files && req.files.length > 0) {
        const petStatusImages = req.files.map((file) => ({
          petStatusId: petStatus.id,
          filename: file.filename,
          path: file.path,
        }));
  
        await PetStatusImage.bulkCreate(petStatusImages);
      }
  
      res.status(201).json({ message: 'Estado de mascota creado exitosamente' });
    } catch (error) {
      console.error('Error al crear el estado de mascota:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  module.exports = {
    createPetStatus,
  };
