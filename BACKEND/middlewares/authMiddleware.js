const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del header
    if (!token) return res.status(401).send('Token es requerido'); // Cambiado a 401

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => { // Usar variable de entorno
        if (err) return res.status(403).send('Token inválido');
        req.user = user; // Guardar el usuario en la solicitud
        next();
    });
};

module.exports = authMiddleware;
