// const jwt = require('jsonwebtoken');

// // Middleware para verificar el token
// exports.verifyToken = (req, res, next) => {
//   const token = req.headers['authorization'];

//   console.log('Token recibido:', token);

//   if (!token) {
//     return res.status(401).json({ error: 'Token no proporcionado.' });
//   }

//   jwt.verify(token, 'miClaveSecreta', (err, decoded) => {
//     if (err) {
//       console.error('Error al verificar el token:', err);
//       return res.status(401).json({ error: 'Token inválido.' });
//     }

//     req.userId = decoded.userId;
//     req.userRole = decoded.role; // Almacena el rol en req para su uso en las rutas protegidas
//     req.userName = decoded.username;
//     next();
//   });
// };


const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Middleware para verificar el token
exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Token no proporcionado.' });
  }

  const [bearer, token] = authHeader.split(' ');

  if (!bearer || !token || bearer.toLowerCase() !== 'bearer') {
    return res.status(401).json({ error: 'Formato de token inválido.' });
  }

  try {
    const decoded = jwt.verify(token, 'miClaveSecreta');

    // Verificar la existencia del usuario
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado.' });
    }

    req.userId = decoded.userId;
    req.userRole = decoded.role; // Almacena el rol en req para su uso en las rutas protegidas
    req.userName = decoded.username;
    next();
  } catch (err) {
    console.error('Error al verificar el token:', err);
    return res.status(401).json({ error: 'Token inválido.', details: err.message });
  }
};
