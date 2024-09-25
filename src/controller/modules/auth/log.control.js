const LogActividades = require('../../../model/modules/auth/log.model');
const Usuario = require('../../../model/modules/administracion/usuario.model');
const jwt = require('jsonwebtoken');
const conexionModel = require('../../../model/modules/core/connection.js');

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

            return res.status(200).json({ mensaje: 'Autenticación exitosa', token });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensaje: 'Error al autenticar el usuario', error });
        }
    },

    // Crear un nuevo log
    crearLog: async (req, res, next) => {
        try {
            const { usuario_id, accion, entidad_afectada, entidad_id, detalles } = req.body;

            let con = await conexionModel.getConnection(); // Conecta a la instancia de BD

            const nuevoLog = new LogActividades({
                usuario_id,
                accion,
                entidad_afectada,
                entidad_id,
                detalles
            });

            await nuevoLog.save();
            return res.status(201).json({ mensaje: 'Log creado exitosamente', log: nuevoLog });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: 'Error al crear el log', error });
        }
    },

    // Obtener todos los logs
    getLogs: async (req, res, next) => {
        try {
            let con = await conexionModel.getConnection(); // Conecta a la instancia de BD

            const logs = await LogActividades.find();
            return res.status(200).json(logs);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: 'Error al obtener los logs', error });
        }
    },

    // Obtener un log por ID
    getLogById: async (req, res, next) => {
        try {
            const { id } = req.params;

            let con = await conexionModel.getConnection(); // Conecta a la instancia de BD

            const log = await LogActividades.findById(id);
            if (!log) {
                return res.status(404).json({ mensaje: 'Log no encontrado' });
            }
            return res.status(200).json(log);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: 'Error al obtener el log', error });
        }
    },

    // Obtener logs por usuario ID
    getLogsByUsuarioId: async (req, res, next) => {
        try {
            const { usuario_id } = req.params;

            let con = await conexionModel.getConnection(); // Conecta a la instancia de BD

            const logs = await LogActividades.find({ usuario_id });
            if (!logs.length) {
                return res.status(404).json({ mensaje: 'No se encontraron logs para este usuario' });
            }
            return res.status(200).json(logs);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: 'Error al obtener los logs del usuario', error });
        }
    },

    // Actualizar un log
    actualizarLog: async (req, res, next) => {
        try {
            const { id } = req.params;

            let con = await conexionModel.getConnection(); // Conecta a la instancia de BD

            const { accion, entidad_afectada, entidad_id, detalles } = req.body;

            const logActualizado = await LogActividades.findByIdAndUpdate(
                id,
                { accion, entidad_afectada, entidad_id, detalles },
                { new: true, runValidators: true }
            );

            if (!logActualizado) {
                return res.status(404).json({ mensaje: 'Log no encontrado' });
            }

            return res.status(200).json({ mensaje: 'Log actualizado exitosamente', log: logActualizado });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: 'Error al actualizar el log', error });
        }
    },

    // Eliminar un log
    eliminarLog: async (req, res, next) => {
        try {
            const { id } = req.params;

            let con = await conexionModel.getConnection(); // Conecta a la instancia de BD

            const logEliminado = await LogActividades.findByIdAndDelete(id);
            if (!logEliminado) {
                return res.status(404).json({ mensaje: 'Log no encontrado' });
            }

            return res.status(200).json({ mensaje: 'Log eliminado exitosamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: 'Error al eliminar el log', error });
        }
    }
};

module.exports = ControllerLog;
