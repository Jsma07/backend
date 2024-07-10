const jwt = require('jsonwebtoken');
module.exports = function(req, res, next) {
    // Obtener el token del header de la solicitud
    const token = req.header('x-auth-token');
  
    // Verificar si no hay token
    if (!token) {
    //   return res.status(401).json({ mensaje: 'Acceso denegado. No hay token proporcionado.' });
      return res.redirect('/iniciarSesion')
    }
  
    // Verificar el token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = decoded.usuario; // Decodificar y guardar el usuario en el request para su uso posterior
      next(); // Continuar con la ejecución
    } catch (error) {
      return res.redirect('/iniciarSesion')
    }
  };