const express = require('express');
const UsControl = require('../../../controller/modules/administracion/usuario.control');
const authMid = require('../../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: API para gestionar usuarios
 */


/**
 * @swagger
 * /usuario:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   apellido:
 *                     type: string
 *                   correoElectronico:
 *                     type: string
 *       401:
 *         description: No autorizado
 */

// Rutas protegidas por token (authMid)
router.get('/', authMid, UsControl.getUsuarios);  // Obtener todos los usuarios

/**
 * @swagger
 * /usuario/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   description: Nombre del usuario
 *                 apellido:
 *                   type: string
 *                   description: Apellido del usuario
 *                 correoElectronico:
 *                   type: string
 *                   description: Correo electrónico del usuario
 *       404:
 *         description: Usuario no encontrado
 */

router.get('/:id', authMid, UsControl.getUsuarioById);  // Obtener un usuario por su ID

/**
 * @swagger
 * /usuario/correo/{correoElectronico}:
 *   get:
 *     summary: Obtener un usuario por correo electrónico
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: correoElectronico
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado por correo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   description: Nombre del usuario
 *                 apellido:
 *                   type: string
 *                   description: Apellido del usuario
 *                 correoElectronico:
 *                   type: string
 *                   description: Correo electrónico del usuario
 *       404:
 *         description: Usuario no encontrado
 */

router.get('/correo/:correoElectronico', authMid, UsControl.getUsuarioByCorreo);  // Obtener un usuario por correo

/**
 * @swagger
 * /usuario/identificacion/{identificacion}:
 *   get:
 *     summary: Obtener un usuario por número de identificación
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: identificacion
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado por identificación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                 apellido:
 *                   type: string
 *                 identificacion:
 *                   type: string
 *       404:
 *         description: Usuario no encontrado
 */

router.get('/identificacion/:identificacion', authMid, UsControl.getUsuarioByIdentificacion);  // Obtener un usuario por identificación

/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               correoElectronico:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               telefono:
 *                 type: string
 *               direccion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 */

router.post('/', authMid, UsControl.crearUsuario);  // Crear un nuevo usuario

/**
 * @swagger
 * /usuario/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               correoElectronico:
 *                 type: string
 *               telefono:
 *                 type: string
 *               direccion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 */

router.put('/:id', authMid, UsControl.actualizarUsuario);  // Actualizar un usuario

/**
 * @swagger
 * /usuario/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 */

router.delete('/:id', authMid, UsControl.eliminarUsuario);  // Eliminar un usuario

module.exports = router;
