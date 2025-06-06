const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend de Tarefas",
      version: "1.0.0",
      description: "API de tarefas com autenticação",
    },
    servers: [
     {
    url: 'https://backendtarefas-syhe.onrender.com/',
    description: 'Render (produção)'
  },
  {
    url: 'http://localhost:4000/',
    description: 'Localhost (desenvolvimento)'
  }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js"], // Aqui ele lê as rotas com JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
