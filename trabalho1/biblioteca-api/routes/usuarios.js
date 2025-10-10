const express = require("express");
const router = express.Router();

const { registrar, login, listar } = require("../controllers/usuariosController");
const autenticarToken = require("../middleware/authMiddleware");
const autorizarRole = require("../middleware/roleMiddleware");

// Rota pública para registrar
router.post("/registrar", registrar);

// Rota pública para login
router.post("/login", login);

// Rota privada (somente admin) para listar usuários
router.get("/", autenticarToken, autorizarRole("admin"), listar);

// Rota teste opcional (para checar se rota está montada corretamente)
router.get("/teste", (req, res) => {
  res.json({ msg: "Rota /usuarios funcionando corretamente!" });
});

module.exports = router;
