const fs = require("fs");
const path = "./data/editoras.json";

function lerEditoras() {
  if (!fs.existsSync(path)) return [];
  const dados = fs.readFileSync(path);
  return JSON.parse(dados);
}

function salvarEditoras(editoras) {
  fs.writeFileSync(path, JSON.stringify(editoras, null, 2));
}

module.exports = { lerEditoras, salvarEditoras };
