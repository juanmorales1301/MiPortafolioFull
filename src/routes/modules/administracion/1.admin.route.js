const express = require('express');
const routesUsuario = require('./usuario.route');
const routesContacto = require('./contacto.route');

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
router.use('/pruebas', (req, res)=>{
    res.json({correcto: "EndPoint consumido"});
});

module.exports = router;
