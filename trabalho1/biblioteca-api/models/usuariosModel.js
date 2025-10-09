const fs = require("fs");
const path = "./data/usuarios.json";

function lerUsuarios() {
  if (!fs.existsSync(path)) return [];
  const dados = fs.readFileSync(path);
  return JSON.parse(dados);
}

function salvarUsuarios(usuarios) {
  fs.writeFileSync(path, JSON.stringify(usuarios, null, 2));
}

module.exports = { lerUsuarios, salvarUsuarios };
