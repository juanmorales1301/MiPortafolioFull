const express = require('express');
const routesImagen = require('./imagen.route');
const routesAlbum = require('./album.route');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Galeria
 *   description: Rutas relacionadas con la administración de galeria deimagenes
 */

router.use('/album', routesAlbum);
router.use('/imagen', routesImagen);

module.exports = router;
