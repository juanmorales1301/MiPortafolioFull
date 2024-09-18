const express = require('express');
require('dotenv').config();

const router = express.Router();
// router.use(process.env.RUTA_INIT + `/core`, require('./modules/core')); //Core
// router.use(process.env.RUTA_INIT + `/auth`, require('./modules/auth')); //Autentificación
router.use(process.env.RUTA_INIT + `/admin`, require('./modules/administracion/1.admin.route')); //Administración

module.exports = router;
