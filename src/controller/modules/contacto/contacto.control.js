const Contacto = require('../../../model/modules/contacto/contacto.model.js');
const Usuario = require('../../../model/modules/administracion/usuario.model.js');
const conexionModel = require('../../../model/modules/core/connection.js');

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

            res.json({ip: req.ip, ip2: req.headers['x-forwarded-for'], ip3: req.connection.remoteAddress});
            let con = await conexionModel.getConnection(); // Conecta a la instancia de BD


            // Crear nuevo contacto
            const nuevoContacto = new Contacto({
                nombre,
                celular,
                correo,
                mensaje,
                ip: ipCliente,
                fechaContacto,
            });

            // Crear nuevo usuario
            const nuevoUsuario = new Usuario({
                nombre,
                apellido: '-',
                tipoIdentificacion: 'Cédula de Ciudadanía',
                identificacion: '0',
                direccion: 'NA',
                celular,
                telefono: celular,
                correoElectronico: correo,
                contrasena: correo,
                mensaje,
                ip: ipCliente,
                fechaContacto,
            });

            // Guardar el contacto en la base de datos
            await nuevoContacto.save().then(async (result) => {
                await nuevoUsuario.save().then((us) => {
                    return res.status(201).json({ mensaje: 'Contacto creado exitosamente', contacto: result, usuario: us });
                }).catch((errUs) => {
                    return res.status(206).json({ mensaje: 'Error al crear contacto', contacto: result, error: errUs });
                })
            }).catch((err) => {
                return res.status(206).json({ mensaje: 'Error al crear contacto', error: err });
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensaje: 'Error al crear el contacto', error });
        }
    }
};

module.exports = ContactoControl;
