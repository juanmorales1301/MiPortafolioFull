const express = require('express');
const routesAuth = require('./auth.route');
const routesLog = require('./log.route');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Autentificacion
 *   description: Rutas relacionadas con la autentificacion
 */

router.use('/auth', routesAuth);
router.use('/log', routesLog);

module.exports = router;
