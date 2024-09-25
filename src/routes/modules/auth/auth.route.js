const express = require('express');
const AuthControl = require('../../../controller/modules/auth/auth.control.js');
const authMid = require('../../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Logs de Actividades
 *   description: API para gestionar logs de actividades
 */


/**
 * @swagger
 * /usuario/autentificar:
 *   post:
 *     summary: Autenticar un usuario y obtener un token JWT
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correoElectronico:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               contrasena:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Token generado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciales incorrectas
 */

// Autenticación (Login) - No requiere token
router.post('/autentificar', AuthControl.autenticarUsuario);

module.exports = router;
