const fs = require("fs");
const path = "./data/autores.json";

function lerAutores() {
  if (!fs.existsSync(path)) return [];
  const dados = fs.readFileSync(path);
  return JSON.parse(dados);
}

function salvarAutores(autores) {
  fs.writeFileSync(path, JSON.stringify(autores, null, 2));
}

module.exports = { lerAutores, salvarAutores };
