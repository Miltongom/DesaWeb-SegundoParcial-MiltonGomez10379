require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Importar rutas y configuración de base de datos
const carteleraRoutes = require('./routes/cartelera');
const { closePool } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cartelera API',
      version: '1.0.0',
      description: 'API REST para gestión de cartelera de películas',
      contact: {
        name: 'Milton Gómez',
        email: 'milton.gomez@example.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor de desarrollo'
      }
    ]
  },
  apis: ['./routes/*.js', './server.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/api/cartelera', carteleraRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la API de Cartelera',
    documentation: `http://localhost:${PORT}/api-docs`,
    endpoints: {
      'GET /api/cartelera': 'Obtener todas las películas',
      'POST /api/cartelera': 'Crear nueva película',
      'PUT /api/cartelera/:imdbID': 'Actualizar película existente'
    }
  });
});

// Manejo de errores 404
app.use('*', (req, res) => {
  res.status(404).json({
    codError: '404',
    msgRespuesta: 'Endpoint no encontrado'
  });
});

// Manejo de errores globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    codError: '500',
    msgRespuesta: 'Error interno del servidor'
  });
});

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📚 Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
  console.log(`🗄️ Conectado a la base de datos: ${process.env.DB_DATABASE}`);
});

// Manejo de cierre graceful
process.on('SIGINT', async () => {
  console.log('\n🛑 Cerrando servidor...');
  await closePool();
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  });
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Cerrando servidor...');
  await closePool();
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  });
});

module.exports = app;