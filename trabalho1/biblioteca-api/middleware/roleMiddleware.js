function autorizarRole(role) {
  return (req, res, next) => {
    if (req.usuario.role !== role) {
      return res.status(403).json({ msg: "Acesso negado. Permissão insuficiente." });
    }
    next();
  };
}

module.exports = autorizarRole;
