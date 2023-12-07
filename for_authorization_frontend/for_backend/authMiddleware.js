// Ejemplo de middleware de autorización
const authorize = (roles) => {
    return (req, res, next) => {
      const user = req.user; // Suponiendo que el usuario se agrega al objeto de solicitud en un middleware anterior
      if (user && roles.includes(user.role)) {
        next(); // Usuario autorizado
      } else {
        res.status(403).json({ message: 'No tienes permisos para acceder a este recurso.' });
      }
    };
  };
  
  // Uso del middleware en una ruta específica
  app.get('/ruta-protegida', authorize(['user']), (req, res) => {
    res.json({ message: 'Acceso permitido para usuarios.' });
  });
  