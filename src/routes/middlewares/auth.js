const jwt = require('jsonwebtoken');

const validarToken = (req, res, next) => {
    const token = req.header('x-auth-token');  // El token debe venir en los headers

    if (!token) {
        return res.status(401).json({ mensaje: 'No hay token, autorización denegada' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Validar el token
        req.usuario = decoded;  // Si es válido, añadimos los datos del usuario a la request
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token no válido' });
    }
};

module.exports = validarToken;
