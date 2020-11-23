const User = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const usuario = {
    createUser: (req, res) => {
        const {
            nombre,
            email,
            password,
            repeatPassword,
            role,
        } = req.body;

        const user = new User({
            nombre,
            email,
            password: bcrypt.hashSync(password, 10),
            repeatPassword,
            role,
        });

        // if (
        //     password.length == 0 ||
        //     repeatPassword.length == 0
        // ) {
        //     return res.status(400).json({
        //         ok: false,
        //         message:
        //             'Las contraseñas son obligatorias.',
        //     });
        // } else {
        //     if (password !== repeatPassword) {
        //         return res.status(400).json({
        //             ok: false,
        //             message:
        //                 'Las contraseñas no son iguales.',
        //         });
        //     }
        // }

        user.save((err, userDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }

            res.json({
                ok: true,
                usuario: userDB,
            });
        });
    },

    updateUser: (req, res) => {
        const id = req.params.id;
        const body = _.pick(req.body, [
            'nombre',
            'email',
            'img',
            'role',
            'estado',
        ]);

        User.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true },
            (err, userDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err,
                    });
                }

                res.json({
                    ok: true,
                    usuario: userDB,
                });
            }
        );
    },

    allUser: (req, res) => {
        let desde = req.query.desde || 0;
        desde = Number(desde);

        let limit = req.query.limit || 0;
        limit = Number(limit);

        User.find({estado: true}, 'nombre email google')
            .skip(desde)
            .limit(limit)
            .exec((err, usuarios) => {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        err,
                    });
                }

                User.count({estado: true}, (err, conteo) => {
                    res.json({
                        ok: true,
                        usuarios,
                        totalUsuarios: conteo,
                    });
                });
            });
    },

    deleteUser: (req, res) => {
        const id = req.params.id;

        User.findByIdAndUpdate(id, { estado: false } ,(err, userDelete) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err,
                });
            }

            if (!userDelete) {
                res.status(400).json({
                    ok: false,
                    err: {
                        message: 'usuario no encontrado',
                    },
                });
            }

            res.json({
                ok: true,
                usuario: userDelete,
            });
        });
    },
};

module.exports = usuario;
