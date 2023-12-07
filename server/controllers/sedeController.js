
const { Sede, Organization, User } = require('../models');

module.exports.createSede = async (req, res) => {
  try {
    console.log('Recibiendo datos del cliente:', req.body);

    // Obtener información del usuario autenticado
    const userId = req.userId;
    const user = await User.findByPk(userId, {
      include: [Organization], // Incluye la asociación con Organization
    });

    // Obtener organizationId del usuario
    const organizationId = user.Organization.id;

    // Crear el objeto sedeData con los datos del cuerpo de la solicitud
    const sedeData = {
      name: req.body.name,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      postalCode: req.body.postalCode,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      openingTime: req.body.openingTime,
      closingTime: req.body.closingTime,
      // Otros campos según sea necesario
    };

    // Crear la sede asociada a la organización y al usuario
    const nuevaSede = await Sede.create({ ...sedeData, organizationId, userId });

    res.status(201).json({ success: true, message: 'Sede creada exitosamente', sede: nuevaSede });
  } catch (error) {
    console.error(`Error al crear la sede: ${error.message}`);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};



// Obtener todas las sedes de una organización a partir del ID del usuario autenticado
module.exports.getSedesByUserOrganization = async (req, res) => {
  try {
    // Obtener ID del usuario autenticado
    const userId = req.userId;

    // Buscar al usuario y sus asociaciones con la organización
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Organization,
          include: Sede, // Incluir las sedes asociadas a la organización
        },
      ],
    });

    // Verificar si el usuario y la organización existen
    if (!user || !user.Organization) {
      return res.status(404).json({ error: 'Usuario u organización no encontrados' });
    }

    // Obtener todas las sedes asociadas a la organización del usuario
    const sedes = user.Organization.Sedes;

    res.status(200).json({ success: true, sedes });
  } catch (error) {
    console.error(`Error al obtener las sedes: ${error.message}`);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};




// // Actualizar una sede
// exports.updateSede = async (req, res) => {
//   try {
//     const sedeId = req.params.sedeId;
//     const sedeData = req.body;

//     // Verificar si la sede existe
//     const sede = await Sede.findByPk(sedeId);
//     if (!sede) {
//       return res.status(404).json({ error: 'Sede no encontrada' });
//     }

//     // Actualizar los datos de la sede
//     await sede.update(sedeData);

//     res.status(200).json({ success: true, message: 'Sede actualizada exitosamente', sede });
//   } catch (error) {
//     console.error(`Error al actualizar la sede: ${error.message}`);
//     res.status(500).json({ success: false, message: 'Error interno del servidor' });
//   }
// };

// // Eliminar una sede
// exports.deleteSede = async (req, res) => {
//   try {
//     const sedeId = req.params.sedeId;

//     // Verificar si la sede existe
//     const sede = await Sede.findByPk(sedeId);
//     if (!sede) {
//       return res.status(404).json({ error: 'Sede no encontrada' });
//     }

//     // Eliminar la sede
//     await sede.destroy();

//     res.status(200).json({ success: true, message: 'Sede eliminada exitosamente' });
//   } catch (error) {
//     console.error(`Error al eliminar la sede: ${error.message}`);
//     res.status(500).json({ success: false, message: 'Error interno del servidor' });
//   }
// };
