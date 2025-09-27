const express = require('express');
const { executeQuery, sql } = require('../config/database');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Pelicula:
 *       type: object
 *       required:
 *         - imdbID
 *         - Title
 *         - Year
 *         - Type
 *         - Poster
 *         - Estado
 *         - description
 *         - Ubication
 *       properties:
 *         imdbID:
 *           type: string
 *           description: ID único de la película
 *         Title:
 *           type: string
 *           description: Título de la película
 *         Year:
 *           type: string
 *           description: Año de lanzamiento
 *         Type:
 *           type: string
 *           description: Género de la película
 *         Poster:
 *           type: string
 *           description: URL del póster
 *         Estado:
 *           type: boolean
 *           description: Estado activo/inactivo
 *         description:
 *           type: string
 *           description: Descripción de la película
 *         Ubication:
 *           type: string
 *           description: Ubicación del cine
 *     RespuestaExito:
 *       type: object
 *       properties:
 *         codError:
 *           type: string
 *         msgRespuesta:
 *           type: string
 *     RespuestaError:
 *       type: object
 *       properties:
 *         codError:
 *           type: string
 *         msgRespuesta:
 *           type: string
 */

/**
 * @swagger
 * /api/cartelera:
 *   post:
 *     summary: Inserta un nuevo registro de película
 *     tags: [Cartelera]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pelicula'
 *           example:
 *             imdbID: "80000"
 *             Title: "Titanes del Atlántico"
 *             Year: "2013"
 *             Type: "Ciencia Ficcion"
 *             Poster: "https://demo/demoimages.png"
 *             Estado: true
 *             description: "La humanidad se transforma en robots gigantes para defender la costa este de los monstruos que surgen del fondo del mar."
 *             Ubication: "POPCINEMA"
 *     responses:
 *       200:
 *         description: Registro insertado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaExito'
 *             example:
 *               codError: "200"
 *               msgRespuesta: "Registro Insertado"
 *       400:
 *         description: Error de solicitud o datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 *             example:
 *               codError: "400"
 *               msgRespuesta: "Solicitud inválida o mal formada"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 *             example:
 *               codError: "500"
 *               msgRespuesta: "Error interno del servidor"
 */
router.post('/', async (req, res) => {
  try {
    const { imdbID, Title, Year, Type, Poster, Estado, description, Ubication } = req.body;

    // Validación de campos requeridos
    if (!imdbID || !Title || !Year || !Type || !Poster || Estado === undefined || !description || !Ubication) {
      return res.status(400).json({
        codError: "400",
        msgRespuesta: "Solicitud inválida o mal formada (Bad Request)"
      });
    }

    // Verificar si ya existe una película con el mismo imdbID
    const checkQuery = 'SELECT COUNT(*) as count FROM CARTELERA_10379 WHERE imdbID = @imdbID';
    const checkResult = await executeQuery(checkQuery, { imdbID });
    
    if (checkResult.recordset[0].count > 0) {
      return res.status(400).json({
        codError: "400",
        msgRespuesta: "Ya existe una película con este imdbID"
      });
    }

    // Insertar nueva película
    const insertQuery = `
      INSERT INTO CARTELERA_10379 (imdbID, Title, Year, Type, Poster, Estado, Description, Ubication)
      VALUES (@imdbID, @Title, @Year, @Type, @Poster, @Estado, @description, @Ubication)
    `;
    
    await executeQuery(insertQuery, {
      imdbID,
      Title,
      Year,
      Type,
      Poster,
      Estado,
      description,
      Ubication
    });

    res.status(200).json({
      codError: "200",
      msgRespuesta: "Registro Insertado"
    });

  } catch (error) {
    console.error('Error en POST /api/cartelera:', error);
    res.status(500).json({
      codError: "500",
      msgRespuesta: "Error interno del servidor"
    });
  }
});

/**
 * @swagger
 * /api/cartelera:
 *   put:
 *     summary: Actualiza un registro existente basado en su imdbID
 *     tags: [Cartelera]
 *     parameters:
 *       - in: query
 *         name: imdbID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la película a actualizar
 *         example: "80000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pelicula'
 *           example:
 *             imdbID: "80000"
 *             Title: "Titanes del Atlántico"
 *             Year: "2013"
 *             Type: "Ciencia Ficcion"
 *             Poster: "https://demo/demoimages.png"
 *             Estado: true
 *             description: "La humanidad se transforma en robots gigantes para defender la costa este de los monstruos que surgen del fondo del mar."
 *             Ubication: "POPCINEMA"
 *     responses:
 *       200:
 *         description: Registro actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaExito'
 *             example:
 *               codError: "200"
 *               msgRespuesta: "Registro Insertado"
 *       404:
 *         description: Registro no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 *             example:
 *               codError: "404"
 *               msgRespuesta: "Registro no encontrado"
 *       400:
 *         description: Solicitud inválida o mal formada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 *             example:
 *               codError: "400"
 *               msgRespuesta: "Solicitud inválida o mal formada (Bad Request)"
 */
router.put('/', async (req, res) => {
  try {
    const { imdbID: queryImdbID } = req.query;
    const { imdbID, Title, Year, Type, Poster, Estado, description, Ubication } = req.body;

    // Validación de parámetro imdbID en query
    if (!queryImdbID) {
      return res.status(400).json({
        codError: "400",
        msgRespuesta: "Solicitud inválida o mal formada (Bad Request)"
      });
    }

    // Validación de campos requeridos en el body
    if (!imdbID || !Title || !Year || !Type || !Poster || Estado === undefined || !description || !Ubication) {
      return res.status(400).json({
        codError: "400",
        msgRespuesta: "Solicitud inválida o mal formada (Bad Request)"
      });
    }

    // Verificar si existe la película a actualizar
    const checkQuery = 'SELECT COUNT(*) as count FROM CARTELERA_10379 WHERE imdbID = @queryImdbID';
    const checkResult = await executeQuery(checkQuery, { queryImdbID });
    
    if (checkResult.recordset[0].count === 0) {
      return res.status(404).json({
        codError: "404",
        msgRespuesta: "Registro no encontrado"
      });
    }

    // Actualizar la película
    const updateQuery = `
      UPDATE CARTELERA_10379 
      SET imdbID = @imdbID, Title = @Title, Year = @Year, Type = @Type, 
          Poster = @Poster, Estado = @Estado, Description = @description, Ubication = @Ubication
      WHERE imdbID = @queryImdbID
    `;
    
    await executeQuery(updateQuery, {
      imdbID,
      Title,
      Year,
      Type,
      Poster,
      Estado,
      description,
      Ubication,
      queryImdbID
    });

    res.status(200).json({
      codError: "200",
      msgRespuesta: "Registro Insertado"
    });

  } catch (error) {
    console.error('Error en PUT /api/cartelera:', error);
    res.status(500).json({
      codError: "500",
      msgRespuesta: "Error interno del servidor"
    });
  }
});

/**
 * @swagger
 * /api/cartelera:
 *   get:
 *     summary: Devuelve la lista completa de películas disponibles
 *     tags: [Cartelera]
 *     responses:
 *       200:
 *         description: Lista de películas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pelicula'
 *             example:
 *               - imdbID: "80000"
 *                 Title: "Titanes del Atlántico"
 *                 Year: "2013"
 *                 Type: "Ciencia Ficcion"
 *                 Poster: "https://demo/demoimages.png"
 *                 Estado: true
 *                 description: "La humanidad se transforma en robots gigantes para defender la costa este de los monstruos que surgen del fondo del mar."
 *                 Ubication: "POPCINEMA"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 */
router.get('/', async (req, res) => {
  try {
    const query = 'SELECT imdbID, Title, Year, Type, Poster, Estado, Description, Ubication FROM CARTELERA_10379 ORDER BY FechaCreacion DESC';
    const result = await executeQuery(query);
    
    // Formatear los datos para que coincidan con el formato esperado
    const peliculas = result.recordset.map(pelicula => ({
      imdbID: pelicula.imdbID,
      Title: pelicula.Title,
      Year: pelicula.Year,
      Type: pelicula.Type,
      Poster: pelicula.Poster,
      Estado: pelicula.Estado,
      description: pelicula.Description,
      Ubication: pelicula.Ubication
    }));
    
    res.status(200).json(peliculas);
  } catch (error) {
    console.error('Error en GET /api/cartelera:', error);
    res.status(500).json({
      codError: "500",
      msgRespuesta: "Error interno del servidor"
    });
  }
});

module.exports = router;