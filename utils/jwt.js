const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "segredo";

function generateToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { generateToken, verifyToken };
