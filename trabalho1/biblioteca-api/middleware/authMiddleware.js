const jwt = require("jsonwebtoken");

function autenticarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ msg: "Token não fornecido" });

  // Extrai apenas o token depois de "Bearer "
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Token não fornecido" });

  jwt.verify(token, "segredo123", (err, usuario) => {
    if (err) return res.status(403).json({ msg: "Token inválido" });
    req.usuario = usuario; // id e role do usuário
    next();
  });
}

module.exports = autenticarToken;
