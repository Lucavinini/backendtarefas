const pool = require("../db/db");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    const user = result.rows[0];
    if (!user)
      return res.status(401).json({ error: "Usuário ou senha inválidos" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ error: "Usuário ou senha inválidos" });

    const token = generateToken({ id: user.id, username: user.username });
    res.json({ token });
  } catch (e) {
    res.status(500).json({ error: "Erro ao autenticar" });
  }
};
