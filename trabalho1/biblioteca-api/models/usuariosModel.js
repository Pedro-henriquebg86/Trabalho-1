const fs = require("fs");
const path = require("path");

const arquivoUsuarios = path.join(__dirname, "../data/usuarios.json");

// Função para ler os usuários
function lerUsuarios() {
  try {
    const dados = fs.readFileSync(arquivoUsuarios, "utf8");
    return JSON.parse(dados || "[]");
  } catch (error) {
    console.error("Erro ao ler usuários:", error);
    return [];
  }
}

// Função para salvar usuários
function salvarUsuarios(dados) {
  try {
    fs.writeFileSync(arquivoUsuarios, JSON.stringify(dados, null, 2));
  } catch (error) {
    console.error("Erro ao salvar usuários:", error);
  }
}

module.exports = { lerUsuarios, salvarUsuarios };
