require("dotenv").config();
const runMigrations = require("./migrations/migrations");

(async () => {
  try {
    console.log("Iniciando migrações...");
    await runMigrations();
    console.log("Migrações concluídas!");
  } catch (err) {
    console.error("Erro nas migrações:", err);
  } finally {
    process.exit();
  }
})();
