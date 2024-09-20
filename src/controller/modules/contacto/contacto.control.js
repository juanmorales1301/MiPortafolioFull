const Contacto = require('../../../model/modules/contacto/contacto.model.js');

const ContactoControl = {
    crearContacto: async (req, res, next) => {
        try {
            const { nombre, celular, correo, mensaje } = req.body;

            // Validar campos obligatorios
            if (!nombre || !celular || !correo) {
                return res.status(400).json({ mensaje: 'Nombre, celular y correo son obligatorios' });
            }

            // Capturar la IP del cliente y la fecha de contacto
            const ipCliente = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            const fechaContacto = new Date();

            // Crear nuevo contacto
            const nuevoContacto = new Contacto({
                nombre,
                celular,
                correo,
                mensaje,
                ip: ipCliente,
                fechaContacto,
            });

            // Guardar el contacto en la base de datos
            await nuevoContacto.save();
            return res.status(201).json({ mensaje: 'Contacto creado exitosamente', contacto: nuevoContacto });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensaje: 'Error al crear el contacto', error });
        }
    }
};

module.exports = ContactoControl;
