const express = require("express");
const router = express.Router();
const { listar, criar, atualizar, deletar } = require("../controllers/emprestimosController");
const autenticarToken = require("../middleware/authMiddleware");
const autorizarRole = require("../middleware/roleMiddleware");

// qualquer usuário autenticado pode ver e criar (criar: usa req.usuario.id)
// só admin pode atualizar/deletar
router.get("/", autenticarToken, listar);
router.post("/", autenticarToken, criar);
router.put("/:id", autenticarToken, autorizarRole("admin"), atualizar);
router.delete("/:id", autenticarToken, autorizarRole("admin"), deletar);

module.exports = router;
