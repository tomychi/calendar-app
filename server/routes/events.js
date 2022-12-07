/*
    Event Routes
    /api/events
*/

// CRUD (Create, Read, Update, Delete)
const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { validarCampos } = require("../middlewares/validar-campos");
const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");

const router = Router();
// todas tienen que pasar por la validacion del JWT
router.use(validarJWT); // para validar todas las peticiones
// Obtener eventos
router.get("/", getEventos);

// Crear un nuevo evento
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "La fecha de inicio es obligatoria").custom(isDate),
    check("end", "La fecha de fin es obligatoria").custom(isDate),
    validarCampos,
  ],

  crearEvento
);

// Actualizar evento
router.put("/:id", actualizarEvento);

// Borrar evento
router.delete("/:id", eliminarEvento);

module.exports = router;
