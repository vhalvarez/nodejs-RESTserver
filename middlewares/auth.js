const jwt = require('jsonwebtoken');
// Verificar Token
const verificaToken = (req, res, next) => {
    const token = req.get('Authorization');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido',
                },
            });
        }

        req.usuario = decoded.usuario;

        next();
    });
};

const verificaAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'El usuario no es administrador',
            },
        });
    }
};

module.exports = { verificaToken, verificaAdmin_Role };
