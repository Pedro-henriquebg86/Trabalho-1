const fs = require("fs");
let livros = require("../data/livros.json");

function salvarLivros(dados) {
  fs.writeFileSync("./data/livros.json", JSON.stringify(dados, null, 2));
}

exports.listar = (req, res) => {
  res.json(livros);
};

exports.criar = (req, res) => {
  const { titulo, autor, ano } = req.body;
  if (!titulo || !autor || !ano) {
    return res.status(400).json({ msg: "Preencha todos os campos" });
  }

  const novoLivro = { id: livros.length + 1, titulo, autor, ano };
  livros.push(novoLivro);
  salvarLivros(livros);

  res.json({ msg: "Livro adicionado com sucesso", livro: novoLivro });
};

exports.atualizar = (req, res) => {
  const { id } = req.params;
  const { titulo, autor, ano } = req.body;

  const livro = livros.find(l => l.id == id);
  if (!livro) return res.status(404).json({ msg: "Livro não encontrado" });

  livro.titulo = titulo || livro.titulo;
  livro.autor = autor || livro.autor;
  livro.ano = ano || livro.ano;

  salvarLivros(livros);
  res.json({ msg: "Livro atualizado com sucesso", livro });
};

exports.deletar = (req, res) => {
  const { id } = req.params;
  livros = livros.filter(l => l.id != id);
  salvarLivros(livros);
  res.json({ msg: "Livro removido com sucesso" });
};
