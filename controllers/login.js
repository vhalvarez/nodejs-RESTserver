const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth = {
    login: (req, res) => {
        const { email, password } = req.body;

        User.findOne({ email }, (err, userDB) => {
            if (err) {
                return res
                    .status(500)
                    .json({ ok: false, err });
            }

            if (!userDB) {
                return res.status(400).json({
                    ok: false,
                    message: 'Usuario incorrecto.',
                });
            }

            if (
                !bcrypt.compareSync(
                    password,
                    userDB.password
                )
            ) {
                return res.status(400).json({
                    ok: false,
                    message: 'Contraseña incorrecta.',
                });
            }

            let token = jwt.sign(
                {
                    usuario: userDB,
                },
                process.env.SEED,
                { expiresIn: process.env.CADUCIDAD_TOKEN }
            );

            res.json({
                ok: true,
                usuario: userDB,
                token,
            });
        });
    },
};

module.exports = auth;
