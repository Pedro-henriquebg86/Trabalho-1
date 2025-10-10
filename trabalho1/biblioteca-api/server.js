const express = require("express");

const usuariosRoutes = require("./routes/usuarios");
const livrosRoutes = require("./routes/livros");
const autoresRoutes = require("./routes/autores");
const editorasRoutes = require("./routes/editoras");
const emprestimosRoutes = require("./routes/emprestimos");

const app = express();
app.use(express.json());

// Rotas principais
app.use("/usuarios", usuariosRoutes);
app.use("/livros", livrosRoutes);
app.use("/autores", autoresRoutes);
app.use("/editoras", editorasRoutes);
app.use("/emprestimos", emprestimosRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
