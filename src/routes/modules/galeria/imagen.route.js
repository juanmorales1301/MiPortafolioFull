const express = require('express');
const ImagenControl = require('../../../controller/modules/galeria/imagen.control');
const authMid = require('../../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Imágenes
 *   description: API para gestionar imágenes
 */

/**
 * @swagger
 * /imagen:
 *   post:
 *     summary: Crear una nueva imagen
 *     tags: [Imágenes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               album_id:
 *                 type: string
 *               url:
 *                 type: string
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Imagen creada correctamente
 *       500:
 *         description: Error al crear la imagen
 */
router.post('/', authMid, ImagenControl.crearImagen);


/**
 * @swagger
 * /imagen/album/{album_id}:
 *   get:
 *     summary: Obtener imágenes por ID de álbum
 *     tags: [Imágenes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: album_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del álbum
 *     responses:
 *       200:
 *         description: Imágenes encontradas para el álbum
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   url:
 *                     type: string
 *                   titulo:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   estado:
 *                     type: string
 *       404:
 *         description: No se encontraron imágenes para este álbum
 *       500:
 *         description: Error al obtener las imágenes del álbum
 */
router.get('/album/:album_id', authMid, ImagenControl.getImagenesByAlbumId);

/**
 * @swagger
 * /imagen/{id}:
 *   get:
 *     summary: Obtener una imagen por ID
 *     tags: [Imágenes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la imagen
 *     responses:
 *       200:
 *         description: Imagen encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 album_id:
 *                   type: string
 *                 url:
 *                   type: string
 *                 titulo:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 estado:
 *                   type: string
 *       404:
 *         description: Imagen no encontrada
 *       500:
 *         description: Error al obtener la imagen
 */
router.get('/:id', authMid, ImagenControl.getImagenById);


/**
 * @swagger
 * /imagen:
 *   put:
 *     summary: Actualizar una imagen
 *     tags: [Imágenes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la imagen
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Imagen actualizada correctamente
 *       404:
 *         description: Imagen no encontrada
 *       500:
 *         description: Error al actualizar la imagen
 */
router.put('/:id', authMid, ImagenControl.actualizarImagen);

/**
 * @swagger
 * /imagen/{id}:
 *   delete:
 *     summary: Eliminar una imagen
 *     tags: [Imágenes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la imagen
 *     responses:
 *       200:
 *         description: Imagen eliminada correctamente
 *       404:
 *         description: Imagen no encontrada
 *       500:
 *         description: Error al eliminar la imagen
 */
router.delete('/:id', authMid, ImagenControl.eliminarImagen);


/**
 * @swagger
 * /imagen:
 *   get:
 *     summary: Obtener todas las imágenes
 *     tags: [Imágenes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de imágenes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   album_id:
 *                     type: string
 *                   url:
 *                     type: string
 *                   titulo:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   estado:
 *                     type: string
 *       500:
 *         description: Error al obtener las imágenes
 */
router.get('/', authMid, ImagenControl.getImagenes);
module.exports = router;
