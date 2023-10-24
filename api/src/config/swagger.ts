import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  swaggerDefinition: {
    info: {
      title: 'FOOD API',
      version: '1.0.0',
      description: 'Una union entre la API spoonacular y una db para anexar recetas',
    },
    basePath: '/',
  },
  apis: ['./src/routes/swagger/*.yaml'], // Ruta de tus archivos que contienen las anotaciones Swagger
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: any) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}