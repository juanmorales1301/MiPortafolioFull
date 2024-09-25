const Album = require('../../../model/modules/galeria/album.model');
const conexionModel = require('../../../model/modules/core/connection.js');

const ControllerAlbum = {
    // Crear un nuevo álbum
    crearAlbum: async (req, res, next) => {
        try {
            const { nombre, descripcion, usuario_id, numero_imagenes, estado } = req.body;

            let con = await conexionModel.getConnection(); // Conecta a la instancia de BD

            const nuevoAlbum = new Album({
                nombre,
                descripcion,
                usuario_id,
                numero_imagenes,
                estado
            });

            await nuevoAlbum.save();
            return res.status(201).json({ mensaje: 'Álbum creado exitosamente', album: nuevoAlbum });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: 'Error al crear el álbum', error });
        }
    },

    // Obtener todos los álbumes
    getAlbumes: async (req, res, next) => {
        try {
            const albumes = await Album.find();

            let con = await conexionModel.getConnection(); // Conecta a la instancia de BD

            return res.status(200).json(albumes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: 'Error al obtener los álbumes', error });
        }
    },

    // Obtener un álbum por ID
    getAlbumById: async (req, res, next) => {
        try {
            const { id } = req.params;

            let con = await conexionModel.getConnection(); // Conecta a la instancia de BD

            const album = await Album.findById(id);
            if (!album) {
                return res.status(404).json({ mensaje: 'Álbum no encontrado' });
            }
            return res.status(200).json(album);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: 'Error al obtener el álbum', error });
        }
    },

    // Obtener álbumes por ID de usuario
    getAlbumesByUsuarioId: async (req, res, next) => {
        try {
            const { usuario_id } = req.params;

            let con = await conexionModel.getConnection(); // Conecta a la instancia de BD

            const albumes = await Album.find({ usuario_id });
            if (!albumes.length) {
                return res.status(404).json({ mensaje: 'No se encontraron álbumes para este usuario' });
            }
            return res.status(200).json(albumes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: 'Error al obtener los álbumes del usuario', error });
        }
    },

    // Actualizar un álbum
    actualizarAlbum: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { nombre, descripcion, numero_imagenes, estado } = req.body;

            let con = await conexionModel.getConnection(); // Conecta a la instancia de BD


            const albumActualizado = await Album.findByIdAndUpdate(
                id,
                { nombre, descripcion, numero_imagenes, estado },
                { new: true, runValidators: true }
            );

            if (!albumActualizado) {
                return res.status(404).json({ mensaje: 'Álbum no encontrado' });
            }

            return res.status(200).json({ mensaje: 'Álbum actualizado exitosamente', album: albumActualizado });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: 'Error al actualizar el álbum', error });
        }
    },

    // Eliminar un álbum
    eliminarAlbum: async (req, res, next) => {
        try {
            const { id } = req.params;

            let con = await conexionModel.getConnection(); // Conecta a la instancia de BD


            const albumEliminado = await Album.findByIdAndDelete(id);
            if (!albumEliminado) {
                return res.status(404).json({ mensaje: 'Álbum no encontrado' });
            }

            return res.status(200).json({ mensaje: 'Álbum eliminado exitosamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: 'Error al eliminar el álbum', error });
        }
    }
};

module.exports = ControllerAlbum;
