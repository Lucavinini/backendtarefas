const pool = require("../db/db");

exports.createTask = async (req, res) => {
  const { title } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING *",
      [title, req.userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (e) {
    res.status(400).json({ error: "Erro ao criar tarefa" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [
      req.userId,
    ]);
    res.json(result.rows);
  } catch (e) {
    res.status(400).json({ error: "Erro ao buscar tarefas" });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, done } = req.body;
  try {
    const result = await pool.query(
      "UPDATE tasks SET title = $1, done = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [title, done, id, req.userId]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Tarefa não encontrada" });
    res.json(result.rows[0]);
  } catch (e) {
    res.status(400).json({ error: "Erro ao atualizar tarefa" });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.userId]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Tarefa não encontrada" });
    res.json({ message: "Tarefa removida" });
  } catch (e) {
    res.status(400).json({ error: "Erro ao remover tarefa" });
  }
};
