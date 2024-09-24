const mongoose = require('mongoose');

// Definición del esquema de contacto
const contactoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    celular: {
        type: String,
        required: [true, 'El celular es obligatorio'],
        trim: true
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        match: [/.+\@.+\..+/, 'Por favor ingrese un correo electrónico válido']
    },
    mensaje: {
        type: String,
        trim: true
    },
    ip: {
        type: String,
        required: true
    },
    fechaContacto: {
        type: Date,
        default: Date.now
    }
});

// Creación del modelo Contacto
const Contacto = mongoose.model('Contacto', contactoSchema);

module.exports = Contacto;
