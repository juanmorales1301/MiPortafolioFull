const Usuario = require('../../../model/modules/administracion/usuario.model');
const conexionModel = require('../../../model/modules/core/connection.js');
const jwt = require('jsonwebtoken');

const ControllerLog = {
    
    // Autenticar al usuario y generar un token
    autenticarUsuario: async (req, res, next) => {
        try {
            const { correoElectronico, contrasena } = req.body;
            
            let con = await conexionModel.getConnection(); // Conecta a la instancia de BD

            // Verificar si el usuario existe
            const usuario = await Usuario.findOne({ correoElectronico });
            if (!usuario) {
                return res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }

            // Verificar si la contraseña es correcta
            const esContrasenaCorrecta = await usuario.compararContrasena(contrasena);
            if (!esContrasenaCorrecta) {
                return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
            }

            // Generar el token
            const token = jwt.sign(
                { id: usuario._id, correoElectronico: usuario.correoElectronico },
                process.env.JWT_SECRET,  // Llave secreta
                { expiresIn: '1h' } // El token expirará en 1 hora
            );

            delete usuario.contrasena;
            return res.status(200).json({ mensaje: 'Autenticación exitosa', token, usuario });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensaje: 'Error al autenticar el usuario', error });
        }
    },

};

module.exports = ControllerLog;
