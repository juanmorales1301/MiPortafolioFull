const express = require('express');
const ContactoControl = require('../../../controller/modules/contacto/contacto.control.js');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Contactos
 *   description: API para gestionar contactos
 */

/**
 * @swagger
 * /contacto:
 *   post:
 *     summary: Crear un nuevo contacto
 *     tags: [Contactos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               celular:
 *                 type: string
 *               correo:
 *                 type: string
 *               mensaje:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contacto creado correctamente
 *       400:
 *         description: Faltan datos requeridos
 */

// Crear un nuevo contacto
router.post('/', ContactoControl.crearContacto);

module.exports = router;
