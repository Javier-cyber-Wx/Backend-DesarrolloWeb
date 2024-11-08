const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  const token = authHeader.split(' ')[1]; // Eliminar el prefijo 'Bearer '

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token no válido.' });
  }

  try {
    // Verificar el token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Añadir la información del usuario a la solicitud
    next(); // Pasar al siguiente middleware o controlador
  } catch (err) {
    res.status(403).json({ message: 'Token no válido.' });
  }
};

module.exports = { verifyToken };
