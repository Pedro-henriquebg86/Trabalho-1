const { lerEditoras, salvarEditoras } = require("../models/editorasModel");

exports.listar = (req, res) => {
  const editoras = lerEditoras();
  res.json(editoras);
};

exports.criar = (req, res) => {
  const editoras = lerEditoras();
  const { nome, pais, anoFundacao } = req.body;
  if (!nome || !pais || !anoFundacao) return res.status(400).json({ msg: "Preencha todos os campos" });

  const novo = { id: editoras.length + 1, nome, pais, anoFundacao };
  editoras.push(novo);
  salvarEditoras(editoras);
  res.json({ msg: "Editora adicionada com sucesso", editora: novo });
};

exports.atualizar = (req, res) => {
  const editoras = lerEditoras();
  const { id } = req.params;
  const { nome, pais, anoFundacao } = req.body;

  const editora = editoras.find(e => e.id == id);
  if (!editora) return res.status(404).json({ msg: "Editora não encontrada" });

  editora.nome = nome || editora.nome;
  editora.pais = pais || editora.pais;
  editora.anoFundacao = anoFundacao || editora.anoFundacao;

  salvarEditoras(editoras);
  res.json({ msg: "Editora atualizada com sucesso", editora });
};

exports.deletar = (req, res) => {
  let editoras = lerEditoras();
  const { id } = req.params;

  editoras = editoras.filter(e => e.id != id);
  salvarEditoras(editoras);
  res.json({ msg: "Editora removida com sucesso" });
};
