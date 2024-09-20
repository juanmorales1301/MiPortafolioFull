
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
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Configura ruta para publicar documentación de EndPoints


// Configura CORS para permitir todos los orígenes y encabezados
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept']
}));

app.get('/', (req, res) => {
  res.send('Hola, este es mi proyecto Node.js desplegado en Vercel.');
});

// Definir una ruta adicional para "/about"
app.get('/about', (req, res) => {
  res.send('Esta es la página "Acerca de" de mi aplicación Node.js.');
});

//Inicializando rutas
app.use(routes);


//Iniciando servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://${domain}:${port}`);
  console.log(`Documentación disponible en http://${domain}:${port}/api-docs`);
});
