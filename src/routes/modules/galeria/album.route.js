const express = require('express');
const AlbumControl = require('../../../controller/modules/galeria/album.control');
const authMid = require('../../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Álbumes
 *   description: API para gestionar álbumes
 */

/**
 * @swagger
 * /album:
 *   post:
 *     summary: Crear un nuevo álbum
 *     tags: [Álbumes]
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
 *               descripcion:
 *                 type: string
 *               usuario_id:
 *                 type: string
 *               numero_imagenes:
 *                 type: integer
 *               estado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Álbum creado correctamente
 *       500:
 *         description: Error al crear el álbum
 */
router.post('/', authMid, AlbumControl.crearAlbum);

/**
 * @swagger
 * /album:
 *   get:
 *     summary: Obtener todos los álbumes
 *     tags: [Álbumes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de álbumes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   usuario_id:
 *                     type: string
 *                   numero_imagenes:
 *                     type: integer
 *                   estado:
 *                     type: string
 *       500:
 *         description: Error al obtener los álbumes
 */
router.get('/', authMid, AlbumControl.getAlbumes);

/**
 * @swagger
 * /album/{id}:
 *   get:
 *     summary: Obtener un álbum por ID
 *     tags: [Álbumes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del álbum
 *     responses:
 *       200:
 *         description: Álbum encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 usuario_id:
 *                   type: string
 *                 numero_imagenes:
 *                   type: integer
 *                 estado:
 *                   type: string
 *       404:
 *         description: Álbum no encontrado
 *       500:
 *         description: Error al obtener el álbum
 */
router.get('/:id', authMid, AlbumControl.getAlbumById);

/**
 * @swagger
 * /album/usuario/{usuario_id}:
 *   get:
 *     summary: Obtener álbumes por ID de usuario
 *     tags: [Álbumes]
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
 *         description: Álbumes encontrados para el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   numero_imagenes:
 *                     type: integer
 *                   estado:
 *                     type: string
 *       404:
 *         description: Álbumes no encontrados para el usuario
 *       500:
 *         description: Error al obtener los álbumes del usuario
 */
router.get('/usuario/:usuario_id', authMid, AlbumControl.getAlbumesByUsuarioId);

/**
 * @swagger
 * /album:
 *   put:
 *     summary: Actualizar un álbum
 *     tags: [Álbumes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del álbum
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               numero_imagenes:
 *                 type: integer
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Álbum actualizado correctamente
 *       404:
 *         description: Álbum no encontrado
 *       500:
 *         description: Error al actualizar el álbum
 */
router.put('/:id', authMid, AlbumControl.actualizarAlbum);

/**
 * @swagger
 * /album/{id}:
 *   delete:
 *     summary: Eliminar un álbum
 *     tags: [Álbumes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del álbum
 *     responses:
 *       200:
 *         description: Álbum eliminado correctamente
 *       404:
 *         description: Álbum no encontrado
 *       500:
 *         description: Error al eliminar el álbum
 */
router.delete('/:id', authMid, AlbumControl.eliminarAlbum);

module.exports = router;
