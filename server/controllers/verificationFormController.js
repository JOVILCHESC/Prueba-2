// const { VerificationForm, User } = require('../models');

// module.exports.createVerificationForm = async (req, res) => {
//   try {
//     // Verificar si el usuario está autenticado
//     const userId = req.userId;

//     if (!userId) {
//       return res.status(404).json({ success: false, message: 'Usuario no autenticado' });
//     }

//     // Obtener el usuario
//     const user = await User.findByPk(userId);

//     // Verificar si se encontró el usuario
//     if (!user) {
//       return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
//     }

//     console.log('Recibiendo datos del formulario de verificación:', req.body);

//     // Verificar si el usuario ya ha adoptado la mascota
//     const existingVerification = await VerificationForm.findOne({
//       where: {
//         userId: userId,
//         petId: req.body.petId,
//       },
//     });

//     if (existingVerification) {
//       return res.status(400).json({ success: false, message: 'Este usuario ya ha adoptado esta mascota anteriormente.' });
//     }

//     // Crear el objeto formData con los datos del cuerpo de la solicitud
//     const formData = {
//       names: req.body.names,
//       firstLastName: req.body.firstLastName,
//       secondLastName: req.body.secondLastName,
//       rut: req.body.rut,
//       dateOfBirth: req.body.dateOfBirth,
//       email: req.body.email,
//       phoneNumber: req.body.phoneNumber,
//       region: req.body.region,
//       comuna: req.body.comuna,
//       direccion: req.body.direccion,
//       ask_1: req.body.ask_1,
//       ask_2: req.body.ask_2,
//       ask_3: req.body.ask_3,
//       ask_4: req.body.ask_4,
//       ask_5: req.body.ask_5,
//       agreeTerms: req.body.agreeTerms,
//       reunion: req.body.reunion,
//       compromise: req.body.compromise,
//       petId: req.body.petId,
//       // Otros campos según sea necesario
//     };

//     // Crear la verificación asociada al usuario y a la mascota
//     const nuevaVerificacion = await VerificationForm.create({ ...formData, userId });

//     res.status(201).json({ success: true, message: 'Formulario de verificación creado exitosamente', verification: nuevaVerificacion });
//   } catch (error) {
//     console.error(`Error al crear el formulario de verificación: ${error.message}`);
//     res.status(500).json({ success: false, message: 'Error interno del servidor' });
//   }
// };






const { VerificationForm, User, Pet } = require('../models');

module.exports.createVerificationForm = async (req, res) => {
  try {
    // Verificar si el usuario está autenticado
    const userId = req.userId;

    if (!userId) {
      return res.status(404).json({ success: false, message: 'Usuario no autenticado' });
    }

    // Obtener el usuario
    const user = await User.findByPk(userId);

    // Verificar si se encontró el usuario
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    console.log('Recibiendo datos del formulario de verificación:', req.body);

    // Verificar si el usuario ya ha adoptado la mascota
    const existingVerification = await VerificationForm.findOne({
      where: {
        userId: userId,
        petId: req.body.petId,
      },
    });

    if (existingVerification) {
      return res.status(400).json({ success: false, message: 'Este usuario ya ha adoptado esta mascota anteriormente.' });
    }

    // Crear el objeto formData con los datos del cuerpo de la solicitud
    const formData = {
      names: req.body.names,
      firstLastName: req.body.firstLastName,
      secondLastName: req.body.secondLastName,
      rut: req.body.rut,
      dateOfBirth: req.body.dateOfBirth,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      region: req.body.region,
      comuna: req.body.comuna,
      direccion: req.body.direccion,
      ask_1: req.body.ask_1,
      ask_2: req.body.ask_2,
      ask_3: req.body.ask_3,
      ask_4: req.body.ask_4,
      ask_5: req.body.ask_5,
      agreeTerms: req.body.agreeTerms,
      reunion: req.body.reunion,
      compromise: req.body.compromise,
      petId: req.body.petId,
      // Otros campos según sea necesario
    };

    // Crear la verificación asociada al usuario y a la mascota
    const nuevaVerificacion = await VerificationForm.create({ ...formData, userId });

    // Actualizar el campo newPetId con el mismo valor que petId
    await VerificationForm.update({ newPetId: req.body.petId }, { where: { id: nuevaVerificacion.id } });

    res.status(201).json({ success: true, message: 'Formulario de verificación creado exitosamente', verification: nuevaVerificacion });
  } catch (error) {
    console.error(`Error al crear el formulario de verificación: ${error.message}`);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};



// Controlador para obtener posibles adoptantes de una mascota específica
module.exports.getPosiblesAdoptantes = async (req, res) => {
  try {
    // Obtener el petId de los parámetros de la URL
    const { petId } = req.params;

    // Verificar si el petId es válido
    if (!petId) {
      return res.status(400).json({ success: false, message: 'Pet ID no proporcionado' });
    }

    // Realizar la consulta para obtener los posibles adoptantes de la mascota
    const posiblesAdoptantes = await VerificationForm.findAll({
      where: {
        petId: petId,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email'], // Ajusta según tus necesidades
        },
      ],
    });

    // Transformar los resultados a formato JSON
    const posiblesAdoptantesJSON = posiblesAdoptantes.map((adoptante) => adoptante.toJSON());

    console.log('Posibles Adoptantes:', posiblesAdoptantesJSON);

    res.status(200).json({ success: true, posiblesAdoptantes: posiblesAdoptantesJSON });
  } catch (error) {
    console.error(`Error al obtener posibles adoptantes: ${error.message}`);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};
