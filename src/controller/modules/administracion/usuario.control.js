const Usuario = require('../../../model/modules/administracion/usuario.model');

const ControllerUsuario = {
    
    // Obtener todos los usuarios
    getUsuarios: async (req, res, next) => {
        try {
            const usuarios = await Usuario.find();
            return res.status(200).json(usuarios);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensaje: 'Error al obtener los usuarios', error });
        }
    },

    // Obtener un usuario por ID
    getUsuarioById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                return res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }
            return res.status(200).json(usuario);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensaje: 'Error al obtener el usuario', error });
        }
    },

    // Obtener un usuario por identificación
    getUsuarioByIdentificacion: async (req, res, next) => {
        try {
            const { identificacion } = req.params;
            const usuario = await Usuario.findOne({ identificacion });
            if (!usuario) {
                return res.status(404).json({ mensaje: 'Usuario no encontrado con esa identificación' });
            }
            return res.status(200).json(usuario);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensaje: 'Error al obtener el usuario por identificación', error });
        }
    },

    // Obtener un usuario por correo electrónico
    getUsuarioByCorreo: async (req, res, next) => {
        try {
            const { correoElectronico } = req.params;
            const usuario = await Usuario.findOne({ correoElectronico });
            if (!usuario) {
                return res.status(404).json({ mensaje: 'Usuario no encontrado con ese correo electrónico' });
            }
            return res.status(200).json(usuario);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensaje: 'Error al obtener el usuario por correo electrónico', error });
        }
    },

    // Obtener un usuario por nombre de usuario (correo electrónico) y contraseña
    getUsuarioByCorreoYContrasena: async (req, res, next) => {
        try {
            const { correoElectronico, contrasena } = req.body;  // Tomamos los datos del cuerpo de la petición
            const usuario = await Usuario.findOne({ correoElectronico, contrasena });
            if (!usuario) {
                return res.status(404).json({ mensaje: 'Usuario o contraseña incorrectos' });
            }
            return res.status(200).json(usuario);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensaje: 'Error al autenticar el usuario', error });
        }
    },

    // Crear un nuevo usuario
    crearUsuario: async (req, res, next) => {
        try {
            const { nombre, apellido, tipoIdentificacion, identificacion, direccion, correoElectronico, contrasena, telefono } = req.body;

            // Validar si ya existe un usuario con ese correo o identificación
            const existeCorreo = await Usuario.findOne({ correoElectronico });
            const existeIdentificacion = await Usuario.findOne({ identificacion });
            if (existeCorreo) {
                return res.status(400).json({ mensaje: 'El correo electrónico ya está en uso' });
            }
            if (existeIdentificacion) {
                return res.status(400).json({ mensaje: 'El número de identificación ya está en uso' });
            }

            const nuevoUsuario = new Usuario({
                nombre,
                apellido,
                tipoIdentificacion,
                identificacion,
                direccion,
                correoElectronico,
                contrasena,
                telefono
            });

            await nuevoUsuario.save();
            return res.status(201).json({ mensaje: 'Usuario creado exitosamente', usuario: nuevoUsuario });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensaje: 'Error al crear el usuario', error });
        }
    },

    // Actualizar un usuario
    actualizarUsuario: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { nombre, apellido, tipoIdentificacion, identificacion, direccion, correoElectronico, contrasena, telefono, activo } = req.body;

            const usuarioActualizado = await Usuario.findByIdAndUpdate(
                id,
                { nombre, apellido, tipoIdentificacion, identificacion, direccion, correoElectronico, contrasena, telefono, activo },
                { new: true, runValidators: true }
            );

            if (!usuarioActualizado) {
                return res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }

            return res.status(200).json({ mensaje: 'Usuario actualizado exitosamente', usuario: usuarioActualizado });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensaje: 'Error al actualizar el usuario', error });
        }
    },

    // Eliminar un usuario
    eliminarUsuario: async (req, res, next) => {
        try {
            const { id } = req.params;

             const usuarioEliminado = await Usuario.findByIdAndDelete(id);
            if (!usuarioEliminado) {
                return res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }

            return res.status(200).json({ mensaje: 'Usuario eliminado exitosamente' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensaje: 'Error al eliminar el usuario', error });
        }
    }
};

module.exports = ControllerUsuario;
