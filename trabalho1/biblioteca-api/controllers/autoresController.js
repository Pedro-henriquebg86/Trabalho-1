const { lerAutores, salvarAutores } = require("../models/autoresModel");

exports.listar = (req, res) => {
  const autores = lerAutores();
  res.json(autores);
};

exports.criar = (req, res) => {
  const autores = lerAutores();
  const { nome, nacionalidade, dataNascimento } = req.body;
  if (!nome || !nacionalidade || !dataNascimento) return res.status(400).json({ msg: "Preencha todos os campos" });

  const novoAutor = { id: autores.length + 1, nome, nacionalidade, dataNascimento };
  autores.push(novoAutor);
  salvarAutores(autores);

  res.json({ msg: "Autor adicionado com sucesso", autor: novoAutor });
};

exports.atualizar = (req, res) => {
  const autores = lerAutores();
  const { id } = req.params;
  const { nome, nacionalidade, dataNascimento } = req.body;

  const autor = autores.find(a => a.id == id);
  if (!autor) return res.status(404).json({ msg: "Autor não encontrado" });

  autor.nome = nome || autor.nome;
  autor.nacionalidade = nacionalidade || autor.nacionalidade;
  autor.dataNascimento = dataNascimento || autor.dataNascimento;

  salvarAutores(autores);
  res.json({ msg: "Autor atualizado com sucesso", autor });
};

exports.deletar = (req, res) => {
  let autores = lerAutores();
  const { id } = req.params;

  autores = autores.filter(a => a.id != id);
  salvarAutores(autores);
  res.json({ msg: "Autor removido com sucesso" });
};
