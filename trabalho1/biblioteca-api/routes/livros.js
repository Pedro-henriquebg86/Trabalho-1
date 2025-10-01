const express = require("express");
const router = express.Router();
const { listar, criar, atualizar, deletar } = require("../controllers/livrosController");
const autenticarToken = require("../middleware/authMiddleware");
const autorizarRole = require("../middleware/roleMiddleware");

router.get("/", autenticarToken, listar);
router.post("/", autenticarToken, autorizarRole("admin"), criar);
router.put("/:id", autenticarToken, autorizarRole("admin"), atualizar);
router.delete("/:id", autenticarToken, autorizarRole("admin"), deletar);

module.exports = router;
