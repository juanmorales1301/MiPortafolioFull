const express = require('express');
const routesUsuario = require('./usuario.route');
const routesContacto = require('./usuario.route');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Administración
 *   description: Rutas relacionadas con la administración de usuarios
 */

// Usa todas las rutas de usuario bajo el prefijo /usuario
router.use('/usuario', routesUsuario);
router.use('/contacto', routesContacto);

module.exports = router;
