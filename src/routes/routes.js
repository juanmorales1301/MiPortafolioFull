const express = require('express');
require('dotenv').config();
const path = require('path');

const router = express.Router();


//Rutas modulares de API
// router.use(process.env.RUTA_INIT + `/core`, require('./modules/core')); //Core
router.use(process.env.RUTA_INIT + `/auth`, require('./modules/auth/1.auth.route')); //Autentificación
router.use(process.env.RUTA_INIT + `/admin`, require('./modules/administracion/1.admin.route')); //Administración
router.use(process.env.RUTA_INIT + `/galeria`, require('./modules/galeria/1.galeria.route')); //Galeria


//Rutas estaticas WEB
router.use('/', express.static(path.join(__dirname, '../../front/MiPortafolio'))); //Index Portafolio
router.use('/galeria', express.static(path.join(__dirname, '../../front/v-portafolio/dist'))); //Compilado VUE
router.get('/galeria/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../front/v-portafolio/dist', 'index.html'));
});

module.exports = router;
