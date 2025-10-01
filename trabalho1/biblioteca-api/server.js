const express = require("express");
const bodyParser = require("body-parser");

const livrosRoutes = require("./routes/livros");
const usuariosRoutes = require("./routes/usuarios");

const app = express();
app.use(bodyParser.json());

app.use("/livros", livrosRoutes);
app.use("/usuarios", usuariosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
