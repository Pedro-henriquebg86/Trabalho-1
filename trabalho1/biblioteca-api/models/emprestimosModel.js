const fs = require("fs");
const path = "./data/emprestimos.json";

function lerEmprestimos() {
  if (!fs.existsSync(path)) return [];
  const dados = fs.readFileSync(path);
  return JSON.parse(dados);
}

function salvarEmprestimos(emprestimos) {
  fs.writeFileSync(path, JSON.stringify(emprestimos, null, 2));
}

module.exports = { lerEmprestimos, salvarEmprestimos };
