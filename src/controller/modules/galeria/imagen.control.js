const Imagen = require('../../../model/modules/galeria/imagen.model');

const ControllerImagen = {
    // Crear una nueva imagen
    crearImagen: async (req, res, next) => {
        try {
            const { album_id, url, titulo, descripcion, estado } = req.body;

            const nuevaImagen = new Imagen({
                album_id,
                url,
                titulo,
                descripcion,
                estado
            });

            await nuevaImagen.save();
            return res.status(201).json({ mensaje: 'Imagen creada exitosamente', imagen: nuevaImagen });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: 'Error al crear la imagen', error });
        }
    },

    // Obtener todas las imágenes
    getImagenes: async (req, res, next) => {
        try {
            const imagenes = await Imagen.find();
            return res.status(200).json(imagenes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: 'Error al obtener las imágenes', error });
        }
    },

    // Obtener una imagen por ID
    getImagenById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const imagen = await Imagen.findById(id);
            if (!imagen) {
                return res.status(404).json({ mensaje: 'Imagen no encontrada' });
            }
            return res.status(200).json(imagen);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: 'Error al obtener la imagen', error });
        }
    },

    // Obtener imágenes por ID de álbum
    getImagenesByAlbumId: async (req, res, next) => {
        try {
            const { album_id } = req.params;
            const imagenes = await Imagen.find({ album_id });
            if (!imagenes.length) {
                return res.status(404).json({ mensaje: 'No se encontraron imágenes para este álbum' });
            }
            return res.status(200).json(imagenes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: 'Error al obtener las imágenes del álbum', error });
        }
    },

    // Actualizar una imagen
    actualizarImagen: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { url, titulo, descripcion, estado } = req.body;

            const imagenActualizada = await Imagen.findByIdAndUpdate(
                id,
                { url, titulo, descripcion, estado },
                { new: true, runValidators: true }
            );

            if (!imagenActualizada) {
                return res.status(404).json({ mensaje: 'Imagen no encontrada' });
            }

            return res.status(200).json({ mensaje: 'Imagen actualizada exitosamente', imagen: imagenActualizada });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: 'Error al actualizar la imagen', error });
        }
    },

    // Eliminar una imagen
    eliminarImagen: async (req, res, next) => {
        try {
            const { id } = req.params;

            const imagenEliminada = await Imagen.findByIdAndDelete(id);
            if (!imagenEliminada) {
                return res.status(404).json({ mensaje: 'Imagen no encontrada' });
            }

            return res.status(200).json({ mensaje: 'Imagen eliminada exitosamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: 'Error al eliminar la imagen', error });
        }
    }
};

module.exports = ControllerImagen;
