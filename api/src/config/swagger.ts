import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {Express} from 'express'

const options = {
  swaggerDefinition: {
    info: {
      title: 'FOOD API',
      version: '1.0.0',
      description: 'Una union entre la API spoonacular y una db para anexar recetas',
    },
    components: {
      securitySchemes: {
        token: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{
      token: []
    }]
  },
  apis: ['./src/routes/swagger/*.yaml', './src/schemas/*.yaml'], // Ruta de tus archivos que contienen las anotaciones Swagger
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}