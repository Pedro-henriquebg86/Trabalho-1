const fs = require("fs");
const path = "./data/livros.json";

function lerLivros() {
  if (!fs.existsSync(path)) return [];
  const dados = fs.readFileSync(path);
  return JSON.parse(dados);
}

function salvarLivros(livros) {
  fs.writeFileSync(path, JSON.stringify(livros, null, 2));
}

module.exports = { lerLivros, salvarLivros };
