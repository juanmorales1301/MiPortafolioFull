const express = require('express');
require('dotenv').config();
const path = require('path');

const router = express.Router();

//Rutas estaticas WEB
router.use('/', express.static(path.join(__dirname, '../../front/MiPortafolio'))); //Index Portafolio
router.use('/galeria', express.static(path.join(__dirname, '../../front/v-portafolio/dist'))); //Compilado VUE


//Rutas modulares de API
// router.use(process.env.RUTA_INIT + `/core`, require('./modules/core')); //Core
// router.use(process.env.RUTA_INIT + `/auth`, require('./modules/auth')); //Autentificación
router.use(process.env.RUTA_INIT + `/admin`, require('./modules/administracion/1.admin.route')); //Administración

module.exports = router;
