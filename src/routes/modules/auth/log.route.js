const express = require('express');
const LogControl = require('../../../controller/modules/auth/log.control');
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
 * /log:
 *   post:
 *     summary: Crear un nuevo log
 *     tags: [Logs de Actividades]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: string
 *                 description: ID del usuario que realizó la acción
 *               accion:
 *                 type: string
 *                 description: Acción realizada (crear, modificar, eliminar, etc.)
 *               entidad_afectada:
 *                 type: string
 *                 description: Entidad afectada (usuario, álbum, imagen, etc.)
 *               entidad_id:
 *                 type: string
 *                 description: ID de la entidad afectada
 *               detalles:
 *                 type: string
 *                 description: Detalles adicionales sobre la acción realizada
 *     responses:
 *       201:
 *         description: Log creado correctamente
 *       500:
 *         description: Error al crear el log
 */
router.post('/', authMid, LogControl.crearLog);

/**
 * @swagger
 * /log:
 *   get:
 *     summary: Obtener todos los logs de actividades
 *     tags: [Logs de Actividades]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos los logs de actividades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   usuario_id:
 *                     type: string
 *                   accion:
 *                     type: string
 *                   entidad_afectada:
 *                     type: string
 *                   entidad_id:
 *                     type: string
 *                   detalles:
 *                     type: string
 *                   fecha:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error al obtener los logs
 */
router.get('/', authMid, LogControl.getLogs);

/**
 * @swagger
 * /log/{id}:
 *   get:
 *     summary: Obtener un log por ID
 *     tags: [Logs de Actividades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del log
 *     responses:
 *       200:
 *         description: Log encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuario_id:
 *                   type: string
 *                 accion:
 *                   type: string
 *                 entidad_afectada:
 *                   type: string
 *                 entidad_id:
 *                   type: string
 *                 detalles:
 *                   type: string
 *                 fecha:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Log no encontrado
 *       500:
 *         description: Error al obtener el log
 */
router.get('/:id', authMid, LogControl.getLogById);

/**
 * @swagger
 * /log/usuario/{usuario_id}:
 *   get:
 *     summary: Obtener logs por ID de usuario
 *     tags: [Logs de Actividades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: usuario_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de logs encontrados para el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   usuario_id:
 *                     type: string
 *                   accion:
 *                     type: string
 *                   entidad_afectada:
 *                     type: string
 *                   entidad_id:
 *                     type: string
 *                   detalles:
 *                     type: string
 *                   fecha:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: No se encontraron logs para el usuario
 *       500:
 *         description: Error al obtener los logs del usuario
 */
router.get('/usuario/:usuario_id', authMid, LogControl.getLogsByUsuarioId);

/**
 * @swagger
 * /log/{id}:
 *   put:
 *     summary: Actualizar un log
 *     tags: [Logs de Actividades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del log
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accion:
 *                 type: string
 *               entidad_afectada:
 *                 type: string
 *               entidad_id:
 *                 type: string
 *               detalles:
 *                 type: string
 *     responses:
 *       200:
 *         description: Log actualizado correctamente
 *       404:
 *         description: Log no encontrado
 *       500:
 *         description: Error al actualizar el log
 */
router.put('/:id', authMid, LogControl.actualizarLog);

/**
 * @swagger
 * /log/{id}:
 *   delete:
 *     summary: Eliminar un log
 *     tags: [Logs de Actividades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del log
 *     responses:
 *       200:
 *         description: Log eliminado correctamente
 *       404:
 *         description: Log no encontrado
 *       500:
 *         description: Error al eliminar el log
 */
router.delete('/:id', authMid, LogControl.eliminarLog);

module.exports = router;
