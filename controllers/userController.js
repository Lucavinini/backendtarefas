const pool = require("../db/db");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      hash,
    ]);
    res.status(201).json({ message: "Usuário criado" });
  } catch (e) {
    res.status(400).json({ error: "Usuário já existe" });
  }
};
