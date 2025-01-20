const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Configuração básica do Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Minha API Express",
      version: "1.0.0",
      description: "Documentação da API feita com Swagger",
    },
    servers: [
      {
        url: "http://localhost:5000", // URL do servidor backend
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Arquivos onde estão suas rotas
};

// Gerar a documentação com swagger-jsdoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
