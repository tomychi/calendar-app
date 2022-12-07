const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese correo',
            });
        }

        usuario = new Usuario(req.body);

        // encriptar contraseña
        const salt = bcrypt.genSaltSync(); // numero aleatorio de vueltas
        usuario.password = bcrypt.hashSync(password, salt); // me genera un hash

        await usuario.save();

        // generar nuestro JWT (JSON WEB TOKEN)

        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'por favor hable con el administrador',
        });
    }
};
const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email',
            });
        }

        // confirmar los passwords (compara la nuevo con la que esta en la db)
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta',
            });
        }

        // generar nuestro JWT (JSON WEB TOKEN)
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'por favor hable con el administrador',
        });
    }
};

const revalidarToken = async (req, res = response) => {
    const { uid, name } = req;

    // generar un nuevo JWT Y retornarlo en esta peticion
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token,
    });
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
};
