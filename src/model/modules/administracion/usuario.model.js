const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Definición del esquema de usuario
const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
        trim: true
    },
    tipoIdentificacion: {
        type: String,
        required: [true, 'El tipo de identificación es obligatorio'],
        enum: ['Cédula de Ciudadanía', 'Cédula de Extranjería', 'Pasaporte', 'Otro']
    },
    identificacion: {
        type: String,
        required: [true, 'El número de identificación es obligatorio'],
        unique: true,
        trim: true
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es obligatoria']
    },
    correoElectronico: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true,
        match: [/.+\@.+\..+/, 'Por favor ingrese un correo electrónico válido']
    },
    contrasena: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    telefono: {
        type: String,
        required: [true, 'El número de teléfono es obligatorio']
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    activo: {
        type: Boolean,
        default: true
    }
});

// Middleware para encriptar la contraseña antes de guardarla
usuarioSchema.pre('save', async function(next) {
    if (!this.isModified('contrasena')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.contrasena = await bcrypt.hash(this.contrasena, salt);
        next();
    } catch (error) {
        return next(error);
    }
});

// Método para comparar contraseñas
usuarioSchema.methods.compararContrasena = async function(contrasenaIngresada) {
    return await bcrypt.compare(contrasenaIngresada, this.contrasena);
};

// Creación del modelo Usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
