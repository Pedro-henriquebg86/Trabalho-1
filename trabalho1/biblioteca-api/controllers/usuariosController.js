const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usuarios = require("../data/usuarios.json");

function salvarUsuarios(dados) {
  fs.writeFileSync("./data/usuarios.json", JSON.stringify(dados, null, 2));
}

exports.registrar = async (req, res) => {
  const { nome, email, senha, role } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ msg: "Preencha todos os campos" });
  }

  const hashedSenha = await bcrypt.hash(senha, 10);
  const novoUsuario = {
    id: usuarios.length + 1,
    nome,
    email,
    senha: hashedSenha,
    role: role || "usuario"
  };

  usuarios.push(novoUsuario);
  salvarUsuarios(usuarios);

  res.json({ msg: "Usuário registrado com sucesso" });
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  const usuario = usuarios.find(u => u.email === email);
  if (!usuario) return res.status(400).json({ msg: "Usuário não encontrado" });

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) return res.status(400).json({ msg: "Senha inválida" });

  const token = jwt.sign(
    { id: usuario.id, role: usuario.role },
    "segredo123",
    { expiresIn: "1h" }
  );

  res.json({ msg: "Login bem-sucedido", token });
};
