const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');  // Agregamos path para servir archivos correctamente
const swaggerDocument = require('./swagger');
const routes = require('./src/routes/routes');

const app = express();
const port = process.env.PORT || 3000;
const domain = process.env.DOMAIN || 'localhost';

// Opciones para Swagger JSdoc
const options = {
  definition: swaggerDocument,
  apis: ['./src/routes/**/*.js'],  // Archivos con anotaciones de swagger
};

// Generar la especificación Swagger a partir de las anotaciones en el código
const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/swagger-static', express.static(path.join(__dirname, 'node_modules/swagger-ui-dist')));

// Configurar CORS para permitir todos los orígenes y encabezados
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept']
}));

// Inicializando las rutas de la API
app.use(routes);

// Iniciando el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://${domain}:${port}`);
  console.log(`Documentación Swagger disponible en http://${domain}:${port}/api-docs`);
  console.log(`Archivos estáticos de Swagger servidos en http://${domain}:${port}/swagger-static/`);
});
