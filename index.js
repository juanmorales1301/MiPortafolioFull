
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDocument = require('./swagger');
const routes = require('./src/routes/routes');

const app = express();
const port = process.env.PORT;
const domain = process.env.DOMAIN;

const options = {
  definition: swaggerDocument,
  apis: ['./src/routes/modules/administracion/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.static('node_modules/swagger-ui-dist'));

// Configura CORS para permitir todos los orígenes y encabezados
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept']
}));

//Inicializando rutas
app.use(routes);


//Iniciando servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://${domain}:${port}`);
  console.log(`Documentación disponible en http://${domain}:${port}/api-docs`);
});
