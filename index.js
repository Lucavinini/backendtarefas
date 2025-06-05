require("dotenv").config();
const express = require("express");
const cors = require("cors");
const runMigrations = require("./migrations/migrations");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors({ origin: "*" }));
app.use(express.json());

runMigrations().then(() => {
  console.log("Migrações concluídas!");
});

app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
