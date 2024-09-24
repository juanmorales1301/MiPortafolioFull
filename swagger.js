require('dotenv').config();

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API NodeJS",
    version: "1.0.0",
    description: "Documentación API practica TalentoTech"
  },
  servers: [
    {      
      url: "/",// URL relativa para que funcione dinámicamente según el entorno
      description: "Servidor API (dinámico)"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};

module.exports = swaggerDocument;
