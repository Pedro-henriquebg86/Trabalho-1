const express = require("express");
const router = express.Router();
const { listar, criar, atualizar, deletar } = require("../controllers/autoresController");
const autenticarToken = require("../middleware/authMiddleware");
const autorizarRole = require("../middleware/roleMiddleware");

// Rotas
router.get("/", autenticarToken, listar); // qualquer usuário logado
router.post("/", autenticarToken, autorizarRole("admin"), criar); // só admin
router.put("/:id", autenticarToken, autorizarRole("admin"), atualizar); // só admin
router.delete("/:id", autenticarToken, autorizarRole("admin"), deletar); // só admin

module.exports = router;
