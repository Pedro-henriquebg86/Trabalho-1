const { lerEmprestimos, salvarEmprestimos } = require("../models/emprestimosModel");
const { lerUsuarios } = require("../models/usuariosModel");
const { lerLivros } = require("../models/livrosModel");

exports.listar = (req, res) => {
  const emprestimos = lerEmprestimos();
  res.json(emprestimos);
};

/**
 * Regras:
 * - Usuário autenticado pode criar empréstimo para si (req.usuario.id)
 * - Admin pode criar empréstimo para qualquer usuário se passar usuarioId no body
 * - Não permite novo empréstimo se já existir um empréstimo com status "ativo" para o mesmo livro
 */
exports.criar = (req, res) => {
  const emprestimos = lerEmprestimos();
  const livros = lerLivros();
  const usuarios = lerUsuarios();

  const { livroId, dataDevolucao, usuarioId: usuarioIdBody } = req.body;
  if (!livroId) return res.status(400).json({ msg: "Preencha o campo livroId" });

  const livro = livros.find(l => l.id == livroId);
  if (!livro) return res.status(404).json({ msg: "Livro não encontrado" });

  // Verifica se já existe empréstimo ativo para esse livro
  const jaEmprestado = emprestimos.find(e => e.livroId == livroId && e.status === "ativo");
  if (jaEmprestado) return res.status(400).json({ msg: "Livro já emprestado" });

  // Decide o usuário do empréstimo:
  // - se admin e passou usuarioId no body -> usa esse id
  // - caso contrário usa o id do token (usuário autenticado)
  let usuarioId = req.usuario.id;
  if (req.usuario.role === "admin" && usuarioIdBody) usuarioId = usuarioIdBody;

  const usuario = usuarios.find(u => u.id == usuarioId);
  if (!usuario) return res.status(404).json({ msg: "Usuário não encontrado" });

  const dataEmprestimo = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const novo = {
    id: emprestimos.length + 1,
    usuarioId,
    livroId,
    dataEmprestimo,
    dataDevolucao: dataDevolucao || null,
    status: "ativo"
  };

  emprestimos.push(novo);
  salvarEmprestimos(emprestimos);
  res.json({ msg: "Empréstimo criado com sucesso", emprestimo: novo });
};

/**
 * Atualização só por admin (marcar devolvido, alterar datas, status)
 */
exports.atualizar = (req, res) => {
  const emprestimos = lerEmprestimos();
  const { id } = req.params;
  const { dataDevolucao, status } = req.body;

  const emprestimo = emprestimos.find(e => e.id == id);
  if (!emprestimo) return res.status(404).json({ msg: "Empréstimo não encontrado" });

  if (req.usuario.role !== "admin") return res.status(403).json({ msg: "Acesso negado" });

  emprestimo.dataDevolucao = dataDevolucao || emprestimo.dataDevolucao;
  if (status) emprestimo.status = status;

  salvarEmprestimos(emprestimos);
  res.json({ msg: "Empréstimo atualizado com sucesso", emprestimo });
};

/**
 * Delete só por admin
 */
exports.deletar = (req, res) => {
  if (req.usuario.role !== "admin") return res.status(403).json({ msg: "Acesso negado" });

  let emprestimos = lerEmprestimos();
  const { id } = req.params;

  emprestimos = emprestimos.filter(e => e.id != id);
  salvarEmprestimos(emprestimos);
  res.json({ msg: "Empréstimo removido com sucesso" });
};
