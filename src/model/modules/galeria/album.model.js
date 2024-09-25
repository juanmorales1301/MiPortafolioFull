const mongoose = require('mongoose');

// Esquema para la tabla Album
const albumSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String
  },
  usuario_id: {
    type: String,
    required: true,
    ref: 'Usuario' // Relación con la tabla Usuario
  },
  creado_en: {
    type: Date,
    default: Date.now
  },
  modificado_en: {
    type: Date
  },
  modificado_por: {
    type: String
  },
  numero_imagenes: {
    type: Number,
    default: 0
  },
  estado: {
    type: String,
    enum: ['activo', 'eliminado'],
    default: 'activo'
  }
});

// Creación del modelo Album
module.exports = mongoose.model('Album', albumSchema);
