require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const { swaggerUi, swaggerDocs } = require("../swagger");

const backend_port = process.env.BACKEND_PORT;
const frontend_port = process.env.FRONTEND_PORT;

const app = express();

// config express and json data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// solve cors
app.use(
  cors({ credentials: true, origin: `http://localhost:${frontend_port}` })
);

// upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// db connection
require("./config/db.js");

// routes
const router = require("./routes/router.js");
app.use(router);

app.listen(backend_port, () => {
  console.log(`App running! 🔥 port: ${backend_port}`);
});
