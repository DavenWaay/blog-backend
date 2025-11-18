const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
      description: 'Simple Express API with Swagger and MongoDB',
    },
  },
  apis: ['./routes/*.js'], // <--- important
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
