const mongoose = require('mongoose');

// Esquema para la tabla Log de Actividades
const logActividadesSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  usuario_id: {
    type: String,
    required: true,
    ref: 'Usuario' // Relación con la tabla Usuario
  },
  accion: {
    type: String,
    required: true
  },
  entidad_afectada: {
    type: String,
    required: true
  },
  entidad_id: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  detalles: {
    type: String
  }
});

// Creación del modelo LogActividades
module.exports = mongoose.model('LogActividades', logActividadesSchema);
