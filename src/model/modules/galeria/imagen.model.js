const mongoose = require('mongoose');

// Esquema para la tabla Imagen
const imagenSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    album_id: {
        type: String,
        required: true,
        ref: 'Album' // Relación con la tabla Album
    },
    url: {
        type: String,
        required: true
    },
    titulo: {
        type: String
    },
    descripcion: {
        type: String
    },
    subido_en: {
        type: Date,
        default: Date.now
    },
    modificado_en: {
        type: Date
    },
    modificado_por: {
        type: String
    },
    estado: {
        type: String,
        enum: ['visible', 'eliminado'],
        default: 'visible'
    }
});

// Creación del modelo Imagen
module.exports = mongoose.model('Imagen', imagenSchema);
