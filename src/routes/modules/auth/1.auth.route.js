const express = require('express');
const routesLog = require('./log.route');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Autentificacion
 *   description: Rutas relacionadas con la autentificacion
 */

router.use('/log', routesLog);

module.exports = router;
