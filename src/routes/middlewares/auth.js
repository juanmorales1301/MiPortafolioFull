const jwt = require('jsonwebtoken');

const validarToken = (req, res, next) => {
    let token = req.header('x-auth-token');  // El token debe venir en los headers

    if (!token) {
        return res.status(401).json({ mensaje: 'No hay token, autorización denegada' });
    }

    // Si el token empieza con 'Bearer ', eliminar ese prefijo
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);  // Elimina 'Bearer ' (primeros 7 caracteres)
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
