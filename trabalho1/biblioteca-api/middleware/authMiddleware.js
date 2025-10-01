const jwt = require("jsonwebtoken");

function autenticarToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ msg: "Token não fornecido" });

  jwt.verify(token, "segredo123", (err, usuario) => {
    if (err) return res.status(403).json({ msg: "Token inválido" });
    req.usuario = usuario;
    next();
  });
}

module.exports = autenticarToken;
