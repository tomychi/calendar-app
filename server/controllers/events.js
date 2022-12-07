const { response } = require("express");
const Evento = require("../models/Evento");

const getEventos = async (req, res = response) => {
  const eventos = await Evento.find().populate("user", "name");

  res.json({
    ok: true,
    eventos,
  });
};

const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body); //instancia de mi modelo

  try {
    evento.user = req.uid; //guardar el id del usuario que crea el evento

    const eventoGuardado = await evento.save();

    res.json({
      ok: true,
      eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};
const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      // cuando algo no existe error 404
      return res.status(404).json({
        ok: false,
        msg: "Evento no encontrado por ese Id",
      });
    }

    // si el usuario no es el dueño del evento
    if (evento.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tienes permiso para actualizar este evento",
      });
    }

    // actualizar el evento
    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );

    res.json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};
const eliminarEvento = async (req, res = response) => {
  const eventoId = req.params.id;

  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      // cuando algo no existe error 404
      return res.status(404).json({
        ok: false,
        msg: "Evento no encontrado por ese Id",
      });
    }

    // si el usuario no es el dueño del evento
    if (evento.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tienes permiso para eliminar este evento",
      });
    }

    await Evento.findByIdAndDelete(eventoId);

    res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
