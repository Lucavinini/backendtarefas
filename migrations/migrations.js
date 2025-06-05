const pool = require("../db/db");

async function runMigrations() {
  console.log("Criando tabela users...");
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);

  console.log("Criando tabela tasks...");
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      done BOOLEAN DEFAULT false,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  console.log("Migrações executadas com sucesso!");
}

module.exports = runMigrations;
