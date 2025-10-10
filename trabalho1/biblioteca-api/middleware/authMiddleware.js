const jwt = require("jsonwebtoken");

function autenticarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ msg: "Token não fornecido" });

  // Extrai o token após o prefixo Bearer
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Token ausente" });

  jwt.verify(token, "segredo123", (err, usuario) => {
    if (err) return res.status(403).json({ msg: "Token inválido" });
    req.usuario = usuario;
    next();
  });
}

module.exports = autenticarToken;
