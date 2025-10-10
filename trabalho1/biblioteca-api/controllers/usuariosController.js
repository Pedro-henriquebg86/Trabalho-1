const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { lerUsuarios, salvarUsuarios } = require("../models/usuariosModel");

// Registrar novo usuário
exports.registrar = async (req, res) => {
  const { nome, email, senha, role } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ msg: "Preencha todos os campos obrigatórios" });
  }

  const usuarios = lerUsuarios();

  // Verifica se o email já existe
  if (usuarios.some(u => u.email === email)) {
    return res.status(400).json({ msg: "Email já cadastrado" });
  }

  // Criptografa a senha
  const hashedSenha = await bcrypt.hash(senha, 10);

  const novoUsuario = {
    id: usuarios.length + 1,
    nome,
    email,
    senha: hashedSenha,
    role: role || "usuario",
  };

  usuarios.push(novoUsuario);
  salvarUsuarios(usuarios);

  res.json({ msg: "Usuário registrado com sucesso", usuario: { id: novoUsuario.id, nome, email, role: novoUsuario.role } });
};

// Login de usuário
exports.login = async (req, res) => {
  const { email, senha } = req.body;
  const usuarios = lerUsuarios();
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

// Listar usuários (somente admin)
exports.listar = (req, res) => {
  const usuarios = lerUsuarios();

  const usuariosSemSenha = usuarios.map(u => ({
    id: u.id,
    nome: u.nome,
    email: u.email,
    role: u.role
  }));

  res.json(usuariosSemSenha);
};
