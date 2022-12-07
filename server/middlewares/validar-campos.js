const { response } = require("express");
const { validationResult } = require("express-validator");

// next hace que pase al siguiente middleware
const validarCampos = (req, res = response, next) => {
  // manejo de errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      msg: errores.mapped(),
    });
  }
  next();
};

module.exports = {
  validarCampos,
};
