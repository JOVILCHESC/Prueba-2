// const { Fundraising, User, Organization } = require('../models');

// module.exports.createFundraising = async (req, res) => {
//   try {
//     console.log('Iniciando la creación de la colecta...');
    
//     // Obtener el ID del usuario autenticado
//     const userId = req.userId;

//     console.log('ID de usuario autenticado:', userId);

//     // Obtener información del usuario autenticado incluyendo la asociación con Organization
//     const user = await User.findByPk(userId, {
//       include: [Organization],
//     });

//     console.log('Usuario obtenido:', user);

//     if (!user || !user.Organization) {
//       console.log('No se encontró una organización asociada al usuario.');
//       return res.status(400).json({ success: false, message: 'No se encontró una organización asociada al usuario.' });
//     }

//     const { title, description, goalAmount, currentAmount, deadline } = req.body;

//     console.log('Datos del formulario:', { title, description, goalAmount, currentAmount, deadline });

//     // Verificar si ya existe una colecta con el mismo título y la misma organización
//     const existingFundraising = await Fundraising.findOne({
//       where: {
//         title,
//         organizationId: user.Organization.id,
//       },
//     });

//     if (existingFundraising) {
//       console.log('Ya existe una colecta con el mismo título para esta organización.');
//       return res.status(400).json({ success: false, message: 'Ya existe una colecta con el mismo título para esta organización.' });
//     }

//     // Crear la colecta
//     const fundraising = await Fundraising.create({
//       userId,
//       organizationId: user.Organization.id,
//       title,
//       description,
//       goalAmount,
//       currentAmount,
//       deadline,
//       status: 'active', // Ajustar según sea necesario.
//     });

//     console.log('Colecta creada con éxito:', fundraising);

//     res.status(201).json({ success: true, fundraising });
//   } catch (error) {
//     console.error('Error al crear la colecta:', error.message);
//     res.status(500).json({ success: false, message: 'Error interno del servidor.' });
//   }
// };




const { Fundraising, User, Organization, Contribution } = require('../models');

module.exports.createFundraising = async (req, res) => {
  try {
    console.log('Iniciando la creación de la colecta...');
    
    // Obtener el ID del usuario autenticado
    const userId = req.userId;

    console.log('ID de usuario autenticado:', userId);

    // Obtener información del usuario autenticado incluyendo la asociación con Organization
    const user = await User.findByPk(userId, {
      include: [Organization],
    });

    console.log('Usuario obtenido:', user);

    if (!user || !user.Organization) {
      console.log('No se encontró una organización asociada al usuario.');
      return res.status(400).json({ success: false, message: 'No se encontró una organización asociada al usuario.' });
    }

    const { title, description, goalAmount, currentAmount, deadline, currentAccount, bankName, rutCompany, holder } = req.body;

    console.log('Datos del formulario:', { title, description, goalAmount, currentAmount, deadline, currentAccount, bankName, rutCompany, holder });

    // Verificar si ya existe una colecta con el mismo título y la misma organización
    const existingFundraising = await Fundraising.findOne({
      where: {
        title,
        organizationId: user.Organization.id,
      },
    });

    if (existingFundraising) {
      console.log('Ya existe una colecta con el mismo título para esta organización.');
      return res.status(400).json({ success: false, message: 'Ya existe una colecta con el mismo título para esta organización.' });
    }

    // Crear la colecta
    const fundraising = await Fundraising.create({
      userId,
      organizationId: user.Organization.id,
      title,
      description,
      goalAmount,
      currentAmount,
      deadline,
      currentAccount,
      bankName,
      rutCompany,
      holder,
      status: 'active', // Ajustar según sea necesario.
    });

    console.log('Colecta creada con éxito:', fundraising);

    res.status(201).json({ success: true, fundraising });
  } catch (error) {
    console.error('Error al crear la colecta:', error.message);
    res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
};






module.exports.getActiveFundraisings = async (req, res) => {
  try {
    // Buscar todas las colectas con status 'active'
    const activeFundraisings = await Fundraising.findAll({
      where: {
        status: 'active',
      },
    });

    res.status(200).json({ success: true, activeFundraisings });
  } catch (error) {
    console.error('Error al obtener colectas activas:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
};





module.exports.contributeToFundraising = async (req, res) => {
  try {
    const { fundraisingId } = req.params;
    const { transactionProof } = req.file;

    // Guardar la contribución en la base de datos
    const contribution = await Contribution.create({
      filename: req.file.filename,
      path: req.file.path,
      fundraisingId,
    });

    // Actualizar el monto actual en la colecta
    const fundraising = await Fundraising.findByPk(fundraisingId);
    if (!fundraising) {
      return res.status(404).json({ success: false, message: 'Colecta no encontrada.' });
    }

    // // Actualizar el monto actual con la cantidad aportada
    // fundraising.currentAmount += parseFloat(req.body.amount);
    // await fundraising.save();

    res.status(201).json({ success: true, contribution });
  } catch (error) {
    console.error('Error al realizar la aportación:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
};

// module.exports.contributeToFundraising = async (req, res) => {
//   try {
//     const { fundraisingId } = req.params;
//     const { transactionProof } = req.file;
//     const { userId } = req.body; // Obtener el ID del usuario desde el cuerpo de la solicitud

//     // Guardar la contribución en la base de datos
//     const contribution = await Contribution.create({
//       filename: req.file.filename,
//       path: req.file.path,
//       fundraisingId,
//       userId: userId || null, // Asignar el userId al registro de contribución, o null si userId no está presente
//     });

//     // Actualizar el monto actual en la colecta
//     const fundraising = await Fundraising.findByPk(fundraisingId);
//     if (!fundraising) {
//       return res.status(404).json({ success: false, message: 'Colecta no encontrada.' });
//     }

//     // Actualizar el monto actual con la cantidad aportada
//     // fundraising.currentAmount += parseFloat(req.body.amount);
//     // await fundraising.save();

//     res.status(201).json({ success: true, contribution });
//   } catch (error) {
//     console.error('Error al realizar la aportación:', error);
//     res.status(500).json({ success: false, message: 'Error interno del servidor.' });
//   }
// };





module.exports.getFundraisingDetails = async (req, res) => {
  try {
    const { fundraisingId } = req.params;

    // Buscar la colecta por su ID
    const fundraising = await Fundraising.findByPk(fundraisingId);

    if (!fundraising) {
      return res.status(404).json({ success: false, message: 'Colecta no encontrada.' });
    }

    res.status(200).json({ success: true, fundraising });
  } catch (error) {
    console.error('Error al obtener detalles de la colecta:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
};




// Obtener colectas iniciadas por el usuario autenticado
module.exports.getUserFundraisings = async (req, res) => {
  try {
    const userId = req.userId;
    console.log('ID de usuario autenticado:', userId);
    // Agrega un log para verificar que la ruta está siendo llamada
    console.log('Obteniendo colectas iniciadas por el usuario...');

    // Buscar todas las colectas creadas por el usuario
    const userFundraisings = await Fundraising.findAll({
      where: {
        userId: userId,
      },
    });
    console.log('Colectas iniciadas por el usuario:', userFundraisings);
    res.status(200).json({ success: true, userFundraisings });
  } catch (error) {
    console.error('Error al obtener colectas iniciadas por el usuario:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
};


module.exports.editFundraising = async (req, res) => {
  try {
    const { fundraisingId } = req.params;
    const { title, description, goalAmount, currentAmount, deadline, status, currentAccount, bankName, rutCompany, holder } = req.body;

    // Buscar la colecta por su ID
    const fundraising = await Fundraising.findByPk(fundraisingId);

    if (!fundraising) {
      return res.status(404).json({ success: false, message: 'Colecta no encontrada.' });
    }

    // Actualizar los campos de la colecta
    fundraising.title = title;
    fundraising.description = description;
    fundraising.goalAmount = goalAmount;
    fundraising.currentAmount = currentAmount;
    fundraising.deadline = deadline;
    fundraising.status = status;
    fundraising.currentAccount = currentAccount;
    fundraising.bankName = bankName;
    fundraising.rutCompany = rutCompany;
    fundraising.holder = holder;

    // Guardar los cambios en la base de datos
    await fundraising.save();

    res.status(200).json({ success: true, fundraising });
  } catch (error) {
    console.error('Error al editar la colecta:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
};



module.exports.getContributions = async (req, res) => {
  try {
    const { fundraisingId } = req.params;

    // Asegúrate de que fundraisingId tenga un valor antes de realizar la consulta
    if (!fundraisingId) {
      return res.status(400).json({ success: false, message: 'ID de recaudación no proporcionado en la solicitud.' });
    }

    const contributions = await Contribution.findAll({
      where: { fundraisingId },
    });

    res.json({ success: true, contributions });
  } catch (error) {
    console.error('Error al obtener las aportaciones de la recaudación:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
};





module.exports.deleteFundraising = async (req, res) => {
  try {
    const { fundraisingId } = req.params;

    // Asegúrate de que fundraisingId tenga un valor antes de realizar la eliminación
    if (!fundraisingId) {
      return res.status(400).json({ success: false, message: 'ID de recaudación no proporcionado en la solicitud.' });
    }

    // Verifica si la colecta existe
    const existingFundraising = await Fundraising.findByPk(fundraisingId);
    if (!existingFundraising) {
      return res.status(404).json({ success: false, message: 'La colecta no existe.' });
    }

    // Elimina la colecta y las contribuciones asociadas
    await Fundraising.destroy({
      where: { id: fundraisingId },
    });

    // Elimina las contribuciones asociadas (opcional, dependiendo de tu lógica)
    await Contribution.destroy({
      where: { fundraisingId },
    });

    res.json({ success: true, message: 'Colecta eliminada exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar la colecta:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
};