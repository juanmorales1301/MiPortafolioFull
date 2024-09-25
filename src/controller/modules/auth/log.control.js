const LogActividades = require('../../../model/modules/auth/log.model');

const ControllerLog = {
    // Crear un nuevo log
    crearLog: async (req, res, next) => {
        try {
            const { usuario_id, accion, entidad_afectada, entidad_id, detalles } = req.body;

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
