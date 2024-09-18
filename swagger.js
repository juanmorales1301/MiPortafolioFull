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
      url: `http://${process.env.DOMAIN}:${process.env.PORT}`
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
