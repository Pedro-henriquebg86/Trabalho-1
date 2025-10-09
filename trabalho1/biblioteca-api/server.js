const express = require("express");

const livrosRoutes = require("./routes/livros");
const usuariosRoutes = require("./routes/usuarios");
const autoresRoutes = require("./routes/autores");
const editorasRoutes = require("./routes/editoras");       // <<-- nova
const emprestimosRoutes = require("./routes/emprestimos"); // <<-- nova

const app = express();

// Usando JSON nativo do Express
app.use(express.json());

// Rotas
app.use("/livros", livrosRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/autores", autoresRoutes);
app.use("/editoras", editorasRoutes);       
app.use("/emprestimos", emprestimosRoutes); 

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
