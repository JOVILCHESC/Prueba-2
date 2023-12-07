const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const tokenKey = process.env.TOKEN_KEY;
const { User, Organization } = require('../models');

exports.registerUser = async (req, res) => {
  try {
    const { type, ...userData } = req.body;

    if (!type || (type !== 'user' && type !== 'organization')) {
      return res.status(400).json({ error: 'El campo "type" es inválido' });
    }
    console.log('Datos del usuario:', userData);

    // Verificar si ya existe un usuario con el mismo correo electrónico
    const existingUser = await User.findOne({ where: { email: userData.email } });

    if (existingUser) {
      return res.status(400).json({ error: 'Ya existe un usuario con este correo electrónico' });
    }

    // Hashear la contraseña antes de almacenarla en la base de datos
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const user = await User.create({ ...userData, type, password: hashedPassword });
    let organizationData = null;
    if (type === 'organization') {
  
      const organizationData = req.body.organizationData;
      console.log('Datos de la organización:', organizationData);

      if (!organizationData || !organizationData.legal_name) {
        return res.status(400).json({ error: 'Todos los campos de la organización son obligatorios' });
      }

      organizationData.userId = user.id;

      try {
        await Organization.create(organizationData);
      } catch (orgError) {
        console.error('Error al crear la organización:', orgError);
        return res.status(500).json({ error: 'Error interno al crear la organización' });
      }
    }
    console.log('Usuario creado:', user.toJSON());
    console.log('Datos de la organización:', organizationData);


    res.status(201).json({ message: 'Registro exitoso' });
  } catch (error) {
    console.error('Error al registrar:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


// Inicio de sesión y generación de token
// Inicio de sesión y generación de token
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    const token = jwt.sign({ userId: user.id, username: user.name, role: user.type }, 'miClaveSecreta', {
      expiresIn: '24h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión.' });
  }
};


exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ['password'] }, // Excluimos la contraseña en la respuesta
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener el usuario por email:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
